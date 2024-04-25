import { Express, Request, Response } from 'express';
import { Nullable } from '../../types/NullableD';
import { AccountModel } from '../../database/index';
import { Validation } from './validation';
import bcrypt from 'bcrypt';
import { HandleExpressValidator, JsonWebToken, RequestedMigrate } from '../../tools';

export class Accounts {
    express: Nullable<Express> = null
    constructor(express) {
        this.express = express;
        this.HTTPLIsteners();
        this.SQLBaseDataMigrate();
    }

    private SQLBaseDataMigrate() {
        RequestedMigrate(() => {
            const admin = AccountModel.build({
                nickname: 'Hovhannes',
                password: bcrypt.hashSync('123456789', 10),
                title: 'admin'
            });

            const user = AccountModel.build({
                nickname: 'Maria',
                password: bcrypt.hashSync('123456789', 10),
                title: 'user'
            });

            admin.save();
            user.save();
        })

    }

    private async OnSignIn(request: Request, response: Response) {
        HandleExpressValidator(request, response, async () => {
            const wrongCredentials = {
                error: {
                    message: "Invalid username or password"
                }
            }

            const user = await AccountModel.findOne({
                where: {
                    nickname: request.body.nickname
                }
            });

            if (!user) {
                response.status(400).send(wrongCredentials)
                return false;
            }



            const validPassword = bcrypt.compareSync(request.body.password, user.dataValues.password);

            if (validPassword) {
                user.update({ token: await JsonWebToken.Sign({ nickname: user.dataValues.nickname, id: user.dataValues.id }) })

                response.status(200).send({
                    token: user.dataValues.token
                });

                return
            }

            response.status(400).send(wrongCredentials);
        })
    }

    private OnSignUp(request: Request, response: Response) {
        HandleExpressValidator(request, response, () => {
            response.status(200)
        })
    }

    private async OnAccountsList(_request: Request, response: Response) {
        const accounts = await AccountModel.findAll();

        const filteredAccounts = accounts.map(account => {
            delete account.dataValues.password
            delete account.dataValues.token

            return account
        });

        response.send(filteredAccounts);
    }

    private async OnSignOut(request: Request, response: Response) {

    }

    private HTTPLIsteners() {
        this.express.post('/accounts/sign-in', Validation.SignInValidationRules(), this.OnSignIn)
        this.express.post('/accounts/sign-up', Validation.SignUpValidationRules(), this.OnSignUp)
        this.express.get('/accounts/list', this.OnAccountsList)
        this.express.post('/accounts/sign-out', this.OnSignOut)
    }
}