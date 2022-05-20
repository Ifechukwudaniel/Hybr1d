import debug from "debug";
import mongooseService  from "../../common/services/mongoose.service";
import { CreateOrderDto } from "../dto/create.orders.dto";
const log:debug.IDebugger = debug("app::catalogs-dao")

class OrdersDao {
    Schema = mongooseService.getMongoose().Schema

    ordersSchema = new this.Schema({
       productId:{type:String, ref:"Products"},
       sellerId:{type:String, ref:"Users"},
       buyerId:{type:String, ref:"Users"},
    }) 

    Order = mongooseService.getMongoose().model("Order", this.ordersSchema) 

    constructor() {
      log("New Order Doa Instance")
    }

    async add(fields:CreateOrderDto){
         const order  = new this.Order({...fields})
         // save   orders
         await order.save()
         return order
    }

    async list(limit=20, page=0, query={} ){
      return this.Order.find(query)
      .limit(limit)
      .skip(limit*page)
      .exec()
  }
}

export default  new OrdersDao()