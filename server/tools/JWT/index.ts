import jwt from 'jsonwebtoken';

type JWTDecodeT = { id: number; nickname: string; iat: number }

export class JsonWebToken {
    public static async Sign(payload, options: jwt.SignOptions = {}) {
        return await jwt.sign(payload, process.env.TOP_SECRET, options)
    }

    public static async Verify(token) {
        return await jwt.verify(token, process.env.TOP_SECRET)
    }

    public static async Decode(token, options: jwt.DecodeOptions = {}): Promise<JWTDecodeT> {
        return await jwt.decode(token, options) as JWTDecodeT
    }


}