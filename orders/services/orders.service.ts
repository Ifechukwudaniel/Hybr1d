import debug,{IDebugger} from "debug";
import orderDaos from "../daos/orders.daos";
import {CreateOrderDto} from '../dto/create.orders.dto'

const log: IDebugger = debug('app:users-service');


class OrderService{
   async createOrder(resource:CreateOrderDto){
      return orderDaos.add(resource)
   }
}

export default new OrderService();