import { Application } from 'express';
import {CommonRoutesConfig} from '../common/common.routes.config'
import productsController from './controllers/products.controller';


export class ProductRoutes extends CommonRoutesConfig {
    constructor(app:Application){
        super(app, "AuthRoutes");
    }
    configureRoutes(): Application {
        this.app.post('/api/product',[
            productsController.addProduct
        ])
        return this.app
    }
    
}