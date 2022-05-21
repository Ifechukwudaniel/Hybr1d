import { Application } from 'express';
import { body, param } from 'express-validator';
import authMiddleware from '../auth/middleware/auth.middleware';
import { CommonRoutesConfig } from '../common/common.routes.config'
import bodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import paramsValidationMiddleware from '../common/middleware/params.validation.middleware';
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
            param('seller_id').isString(),
            paramsValidationMiddleware.verifyParamsFieldsErrors,
            authMiddleware.validateBearerToken,
            buyersController.getSellerCatalog
        ])
        this.app.post('/api/buyer/create-order/:seller_id',[
            param('seller_id').isString(),
            paramsValidationMiddleware.verifyParamsFieldsErrors,
            body('products').isArray({min:1, max:10}),
            bodyValidationMiddleware.verifyBodyFieldsErrors,
            authMiddleware.validateBearerToken,
            buyersController.createOrder
        ])
        return this.app
    }
}