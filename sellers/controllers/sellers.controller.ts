import {NextFunction, Request, Response} from 'express'
import debug,{IDebugger} from "debug";
import catalogsService from '../../catalogs/services/catalogs.service';
import productsService from '../../products/services/products.service';
import ordersService from '../../orders/services/orders.service';

const log: IDebugger = debug('app:users-controller');


class SellerController{
    async createProduct(req:Request , res:Response, next:NextFunction){
        log("body", req.body)
        try {
            req.body.sellerId = res.locals.jwt.userId
            const product =  await productsService.createProduct(req.body)
            res.status(201).send(product)
        } catch (err) {
            next(err)
        }
    }
    async createCatalog(req:Request , res:Response, next:NextFunction){
        try {
           req.body.sellerId = res.locals.jwt.userId
           let catalog =   await  catalogsService.createCatalogs(req.body)
           return res.status(201).send(catalog)
        } catch (error) {
            next(error)
        }
    }
    async  getOrders(req:Request,res:Response, next: NextFunction) {
        try {
            let {userId} = res.locals.jwt
            let order =  await  ordersService.getOrders(userId)
            return res.send({order, message:"found orders"})
        } catch (error) {
              return next(error)
        }
    }
}

export default new SellerController();