import { body } from 'express-validator'

export class Validation {
    public static FriendshipRequest() {
        return [
            body('user_id').optional(false).isNumeric()
        ]
    }
}