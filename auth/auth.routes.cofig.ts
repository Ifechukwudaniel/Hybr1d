import { Application } from 'express';
import {CommonRoutesConfig} from '../common/common.routes.config'
import authController from './controller/auth.controller';
import authMiddleware from './middleware/auth.middleware';


export class AuthRoutes extends CommonRoutesConfig {
    constructor(app:Application){
        super(app, "AuthRoutes");
    }
    configureRoutes(): Application {
        this.app.post('/api/auth/register',[
            authMiddleware.validateBodyRequest,
            authController.registerUser
        ])

       this.app.post('/api/auth/login', [
           authMiddleware.validateBodyRequest,
           authMiddleware.validateUserPassword,
           authController.loginJWT
       ])
        return this.app
    }
    
}