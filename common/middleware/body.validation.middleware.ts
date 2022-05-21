import express from 'express';
import { validationResult } from 'express-validator';

class BodyValidationMiddleware {
    verifyBodyFieldsErrors(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array().map(({value,msg, param})=> `${msg} for ${param} with ${value}`)  });
        }
        next();
    }
}

export default new BodyValidationMiddleware();