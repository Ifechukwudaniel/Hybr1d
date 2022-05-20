import { Application } from 'express';
import authMiddleware from '../auth/middleware/auth.middleware';
import { CommonRoutesConfig } from '../common/common.routes.config'
import buyersController from './controllers/buyers.controller';


export class BuyersRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, "BuyersRoutes");
    }
    configureRoutes(): Application {
        this.app.get('/api/buyer/list-of-sellers', [
            authMiddleware.validateBearerToken,
            buyersController.listSellers
        ])

        this.app.get('/api/buyer/seller-catalog/:seller_id',[
            authMiddleware.validateBearerToken,
            buyersController.getSellerCatalog
        ])
        this.app.post('/api/buyer/create-order/:seller_id',[
            authMiddleware.validateBearerToken,
            buyersController.createOrder
        ])
        return this.app
    }
}