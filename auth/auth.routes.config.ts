import { Application } from 'express';
import {CommonRoutesConfig} from '../common/common.routes.config'
import authController from './controller/auth.controller';
import authMiddleware from './middleware/auth.middleware';
import { body, check } from 'express-validator';
import bodyValidationMiddleware from '../common/middleware/body.validation.middleware';


export class AuthRoutes extends CommonRoutesConfig {
    constructor(app:Application){
        super(app, "AuthRoutes");
    }
    configureRoutes(): Application {
        this.app.post('/api/auth/register',[
            body("email").isEmail(),
            body('password')
               .isLength({ min: 7 })
               .withMessage('Must include password (7+ characters)'),
            body('name').isString().withMessage("Please add your email"),
            check("userType").isIn([0,1]),
            bodyValidationMiddleware.verifyBodyFieldsErrors,
            authMiddleware.validateBodyRequest,
            authController.registerUser
        ])

       this.app.post('/api/auth/login', [
           body("email").isEmail(),
           body('password')
                .isLength({ min: 7 })
                .withMessage('Must include password (7+ characters)'),
           bodyValidationMiddleware.verifyBodyFieldsErrors,
           authMiddleware.validateBodyRequest,
           authMiddleware.validateUserPassword,
           authController.loginJWT
       ])
        return this.app
    }
    
}