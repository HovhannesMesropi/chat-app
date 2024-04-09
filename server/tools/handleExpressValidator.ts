import { Request, Response } from 'express'
import { validationResult } from 'express-validator';

export const HandleExpressValidator = (request: Request, response: Response, onResolve) => {
    const validResult = validationResult(request);
    if (!validResult.isEmpty()) {
        response.send({ errors: validResult.array() });
    } else {
        onResolve()
    }
}