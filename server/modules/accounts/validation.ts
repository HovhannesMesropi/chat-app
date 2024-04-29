import { body } from 'express-validator'

export class Validation {
    public static SignInValidationRules() {
        return [
            body('nickname').optional(false).isString().isLength({ min: 4 }),
            body('password').optional(false).isString().isLength({ min: 4 }),
        ]
    }

    public static SignUpValidationRules() {
        return [
            body('nickname').optional(false).isString().isLength({ min: 4 }),
            body('password').optional(false).isString().isLength({ min: 4 }),
        ]
    }
}