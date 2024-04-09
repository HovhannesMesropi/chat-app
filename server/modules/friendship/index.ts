import { AccountModel, FriendRequest, FriendshipModel } from '../../database';
import { HandleExpressValidator, JsonWebToken } from '../../tools';
import { AuthTokenChecker } from '../../tools/JWT/authChecker';
import { Nullable } from '../../types/NullableD';
import { Express, Request, Response } from 'express';
import { Validation } from './validation';


export class Friendship {
    express: Nullable<Express> = null

    constructor(express) {
        this.express = express;
        this.HTTPLIsteners();
    }


    private async OnGetRequestedList(request: Request, response: Response) {
        const currentUser = await JsonWebToken.Decode(request.headers.auth);
        AuthTokenChecker(request, response, async () => {
            const friendRequests = await FriendRequest.findAll({
                where: {
                    $or: [
                        {
                            requested: currentUser.id
                        },
                        {
                            requestor: currentUser.id
                        }
                    ]
                }
            });
            response.status(200).send(friendRequests);
        })
    }

    private async OnRequest(request: Request, response: Response) {
        HandleExpressValidator(request, response, async () => {
            AuthTokenChecker(request, response, async () => {
                const requestTo = request.body.user_id;
                const requestedToAccount = await AccountModel.findOne({ where: { id: requestTo } });

                if (!requestedToAccount) {
                    response.status(400).send({ message: "No user with current id found" });
                    return false;
                }

                const currentUser = await JsonWebToken.Decode(request.headers.auth);

                FriendRequest.create({
                    requestor: currentUser.id,
                    requested: requestedToAccount.dataValues.id
                })

                response.status(200).send(true);
            })
        })
    }

    private OnAccept(request: Request, response: Response) {

        HandleExpressValidator(request, response, async () => {
            AuthTokenChecker(request, response, async () => {
                const currentUser = await JsonWebToken.Decode(request.headers.auth);
                const friendRequest = await FriendRequest.findOne({
                    where: {
                        requestor: request.body.user_id,
                        requested: currentUser.id

                    }
                })

                if (!friendRequest) {
                    response.status(400).send({ message: "Requestor not found" });
                    return false;
                }

                await FriendshipModel.create({
                    requestedBy: friendRequest.dataValues.requestedBy,
                    friend: currentUser.id
                })

                response.status(200).send(true);
            })
        })

    }

    private HTTPLIsteners() {
        this.express.get("/friendship/get-requested-list", this.OnGetRequestedList);
        this.express.post("/friendship/request", Validation.FriendshipRequest(), this.OnRequest);
        this.express.post("/friendship/accept", Validation.FriendshipRequest(), this.OnAccept);
    }
}