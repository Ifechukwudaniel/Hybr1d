import { Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config'
import buyersController from './controllers/buyers.controller';


export class BuyersRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, "BuyersRoutes");
    }
    configureRoutes(): Application {
        this.app.get('/api/buyer/list-of-sellers', [
            buyersController.listSellers
        ])
        this.app.get('/buyer/seller-catalog/:seller_id')
        this.app.post('/buyer/create-order/:seller_id')
        return this.app
    }
}