import {Request, Response, NextFunction}  from 'express';
import debug,{IDebugger} from 'debug';
import productsService from '../services/products.service';

const log:IDebugger =  debug("app:auth-controller")

class ProductController{
    async addProduct(req:Request , res:Response, next:NextFunction){
        log("body", req.body)
        try {
            const userId =  await productsService.createProduct(req.body)
            res.status(201).send(userId)
        } catch (err) {
            next(err)
        }
    }
}


export default new ProductController()