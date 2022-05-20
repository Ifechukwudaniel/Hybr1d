import { Application } from 'express';
import authMiddleware from '../auth/middleware/auth.middleware';
import {CommonRoutesConfig} from '../common/common.routes.config'
import commonPermissionMiddleware from '../common/middleware/common.permission.middleware';
import { UserType } from '../common/middleware/common.user.types.enum';
import sellersController from './controllers/sellers.controller';


 export class SellerRoutes extends CommonRoutesConfig {
    constructor(app:Application){
        super(app, "SellerRoutes");
    }
    configureRoutes(): Application {
        this.app.post('/api/seller/create-product',[
            authMiddleware.validateBearerToken,
            commonPermissionMiddleware.onlyExpectedUserTypeCanDoThisAction(UserType.SELLER),
            sellersController.createProduct
        ])

        this.app.post('/api/seller/create-catalog',[
            authMiddleware.validateBearerToken,
            commonPermissionMiddleware.onlyExpectedUserTypeCanDoThisAction(UserType.SELLER),
            sellersController.createCatalog
        ])

        this.app.get('/seller/orders',[])
        return this.app
    }
}