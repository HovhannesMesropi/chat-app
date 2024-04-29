import { body } from 'express-validator'

export class Validation {
    public static DirectMessage() {
        return [
            body('to').optional(false).isNumeric(),
            body('message').optional(false).isString()
        ]
    }
}