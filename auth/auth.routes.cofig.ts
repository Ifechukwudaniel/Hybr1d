import { Application } from 'express';
import {CommonRoutesConfig} from '../common/common.routes.config'


class AuthRoutes extends CommonRoutesConfig {
    constructor(app:Application, name:string){
        super(app, name);
    }
    configureRoutes(): Application {
        this.app.post('/auth/register')
        this.app.post('/auth/login')
        return this.app
    }
    
}