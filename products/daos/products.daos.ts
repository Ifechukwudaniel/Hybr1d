import debug from "debug";
import mongooseService  from "../../common/services/mongoose.service";
import { CreateProductDto } from "../dto/create.products.dto";
import { nanoid } from "nanoid";
import slugify from "slugify";
const log:debug.IDebugger = debug("app::products-dao")

class ProductDao {
    Schema = mongooseService.getMongoose().Schema

    productSchema = new this.Schema({
       _id:String,
       name:String,
       price:Number,
       sellerId:{type:String, index:true, ref:"Users"},
       slug:{type:String,unique:true, index:true}
    }) 

    Product = mongooseService.getMongoose().model("Product", this.productSchema) 

    constructor() {
      log("New Product Doa Instance")
    }

      async add(fields:CreateProductDto){
         let productId:String = nanoid()
         let slug:String = ""
  
         // generate slug for product
          slug = slugify(`${fields.name} ${nanoid(5)}`,`-`)
  
         const product  = new this.Product({_id:productId , slug, ...fields})
  
         // save  product
         await product.save()
         return product
    }
}

export default  new ProductDao()