import { Application } from 'express';
import {CommonRoutesConfig} from '../common/common.routes.config'
import authController from './controller/auth.controller';


export class AuthRoutes extends CommonRoutesConfig {
    constructor(app:Application){
        super(app, "AuthRoutes");
    }
    configureRoutes(): Application {
        this.app.post('/api/auth/register',[
            authController.registerUser
        ])
       // this.app.post('/api/auth/login')
        return this.app
    }
    
}