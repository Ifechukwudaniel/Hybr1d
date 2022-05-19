import {NextFunction, Request, Response} from 'express'
import debug,{IDebugger} from "debug";
import usersService from '../../users/services/users.service';

const log: IDebugger = debug('app:users-controller');


class BuyersController{
    async  listSellers(req:Request,res:Response, next: NextFunction) {
        try {
            let {limit, page} = req.body
            let sealers =  await  usersService.getSellers(limit,page)
            return res.send(sealers)
        } catch (error) {
              return next(error)
        }
    }
}

export default new BuyersController();