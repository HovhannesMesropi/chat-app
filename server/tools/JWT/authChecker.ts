import { Request, Response } from 'express';
import { AccountModel } from '../../database'
import bcrypt from 'bcrypt';

export const AuthTokenChecker = async (request: Request, response: Response, onValid) => {
    if (!request.headers.auth) {
        response.status(400).send({ error: "Token not provided" });
        return false;
    }

    const account = await AccountModel.findOne({ where: { token: request.headers.auth } });

    if(account) {
        onValid();
    } else {
        response.status(400).send({message: "invalid credentials"});
    }
}