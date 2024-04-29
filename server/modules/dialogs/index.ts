import { AccountModel, FriendRequest, FriendshipModel } from '../../database';
import { HandleExpressValidator, JsonWebToken } from '../../tools';
import { AuthTokenChecker } from '../../tools/JWT/authChecker';
import { Nullable } from '../../types/NullableD';
import { Express, Request, Response } from 'express';


export class Dialog {

    express:Nullable<Express> = null;

    constructor(express: Express) {
        this.express = express;
    }

    
}