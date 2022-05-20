import {NextFunction, Request, Response} from 'express'
import debug,{IDebugger} from "debug";
import usersService from '../../users/services/users.service';
import catalogsService from '../../catalogs/services/catalogs.service';
import ordersService from '../../orders/services/orders.service';

const log: IDebugger = debug('app:buyers-controller');


class BuyersController{
    async  listSellers(req:Request,res:Response, next: NextFunction) {
        try {
            let {limit, page} = req.body
            let sellers =  await  usersService.getSellers(limit,page)
            return res.send({sellers})
        } catch (error) {
              return next(error)
        }
    }

    async  getSellerCatalog(req:Request,res:Response, next: NextFunction) {
        try {
            let {seller_id} = req.params
            let sealerCatalog =  await  catalogsService.getSellerCatalogs(seller_id)
            return res.send({products: sealerCatalog.products})
        } catch (error) {
              return next(error)
        }
    }

    async  createOrder(req:Request,res:Response, next: NextFunction) {
        try {
            let {products} = req.body
            let {seller_id} = req.params
            let {userId} = res.locals.jwt

            // prevent use from ordering  from him self 
            if(userId === seller_id) {
                throw new Error("Can't order your own product");
            }
            let order =  await  ordersService.createOrder({buyerId:userId,sellerId:seller_id, products})
            return res.send({order, message:"order was successfully"})
        } catch (error) {
              return next(error)
        }
    }
}

export default new BuyersController();