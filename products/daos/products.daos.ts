import debug from "debug";
import mongooseService  from "../../common/services/mongoose.service";
import {Decimal128} from 'mongoose'

const log:debug.IDebugger = debug("app::products-dao")

class ProductDao {
    Schema = mongooseService.getMongoose().Schema

    productSchema = new this.Schema({
       _id:String,
       name:String,
       price:Number,
       sellerId:{type:String, index:true}
    }) 

    Product = mongooseService.getMongoose().model("Product", this.productSchema) 
}

export default  new ProductDao()