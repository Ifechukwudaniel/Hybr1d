import { Application } from 'express';
import authMiddleware from '../auth/middleware/auth.middleware';
import {CommonRoutesConfig} from '../common/common.routes.config'
import commonPermissionMiddleware from '../common/middleware/common.permission.middleware';
import { UserType } from '../common/middleware/common.user.types.enum';
import sellersController from './controllers/sellers.controller';
import {body, check} from 'express-validator';
import bodyValidationMiddleware from '../common/middleware/body.validation.middleware';

 export class SellerRoutes extends CommonRoutesConfig {
    constructor(app:Application){
        super(app, "SellerRoutes");
    }
    configureRoutes(): Application {
        this.app.post('/api/seller/create-product',[
            body("name").isString(),
            body('price').isNumeric(),
            bodyValidationMiddleware.verifyBodyFieldsErrors,
            authMiddleware.validateBearerToken,
            commonPermissionMiddleware.onlyExpectedUserTypeCanDoThisAction(UserType.SELLER),
            sellersController.createProduct
        ])

        this.app.post('/api/seller/create-catalog',[
            body("products").isArray({min:1, max:20}),
            bodyValidationMiddleware.verifyBodyFieldsErrors,
            authMiddleware.validateBearerToken,
            commonPermissionMiddleware.onlyExpectedUserTypeCanDoThisAction(UserType.SELLER),
            sellersController.createCatalog
        ])

        this.app.get('/api/seller/orders',[
            authMiddleware.validateBearerToken,
            commonPermissionMiddleware.onlyExpectedUserTypeCanDoThisAction(UserType.SELLER),
            sellersController.getOrders
        ])
        return this.app
    }
}