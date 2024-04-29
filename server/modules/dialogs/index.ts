import { DialogModel } from '../../database';
import { HandleExpressValidator, JsonWebToken } from '../../tools';
import { AuthTokenChecker } from '../../tools/JWT/authChecker';
import { Nullable } from '../../types/NullableD';
import { Express, Request, Response } from 'express';
import { Validation } from './validation';


export class Dialog {

    express: Nullable<Express> = null;

    constructor(express: Express) {
        this.express = express;
        this.HTTPListeners()
    }

    private OnSendDirectMessage(request: Request, response: Response) {
        HandleExpressValidator(request, response, async () => {
            AuthTokenChecker(request, response, async () => {
                const currentUser = await JsonWebToken.Decode(request.headers.auth);
                await DialogModel.create({
                    owner: currentUser.id,
                    to: request.body.to,
                    message: request.body.message
                })
                response.status(200).send(true);
            })
        })

    }

    private OnGetDirectMessages(request: Request, response: Response) {
        AuthTokenChecker(request, response, async () => {
            const currentUser = await JsonWebToken.Decode(request.headers.auth);
            const messages = await DialogModel.findAll({where: {
                to: currentUser.id
            }})
            response.status(200).send(messages);
        })
    }


    private HTTPListeners() {
        this.express.post("/dialogs/direct", Validation.DirectMessage(), this.OnSendDirectMessage);
        this.express.get("/dialogs/direct", this.OnGetDirectMessages);
    }
}