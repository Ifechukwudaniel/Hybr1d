import debug,{IDebugger} from "debug";
import orderDaos from "../daos/orders.daos";
import {CreateOrderDto} from '../dto/create.orders.dto'

const log: IDebugger = debug('app:users-service');


class OrderService{
   async createOrder(resource:CreateOrderDto){
      return orderDaos.add(resource)
   }

   async getOrders(sellerId:string){
      return orderDaos.list({sellerId})
   }
}

export default new OrderService();