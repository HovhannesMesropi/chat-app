import { DialogModel } from '../../database';
import { HandleExpressValidator, JsonWebToken } from '../../tools';
import { AuthTokenChecker } from '../../tools/JWT/authChecker';
import { Nullable } from '../../types/NullableD';
import { Express, Request, Response } from 'express';
import { Validation } from './validation';

export class Dialog {

    express: Nullable<Express> = null;
    io: Nullable<any>;

    constructor(express: Express, io: any) {
        this.express = express;
        this.io = io;
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
                this.io.emit('messages_updated');
                
                response.status(200).send(true);
            })
        })

    }

    private OnGetDirectMessages(request: Request, response: Response) {
        AuthTokenChecker(request, response, async () => {
            const allMessages = await DialogModel.findAll()
            response.status(200).send(allMessages);
        })
    }


    private HTTPListeners() {
        this.express.post("/dialogs/direct", Validation.DirectMessage(), this.OnSendDirectMessage.bind(this));
        this.express.get("/dialogs/direct", this.OnGetDirectMessages);
    }
}