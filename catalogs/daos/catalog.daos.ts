import debug from "debug";
import mongooseService  from "../../common/services/mongoose.service";
import { CreateCatalogDto } from "../dto/create.catalogs.dto";
const log:debug.IDebugger = debug("app::catalogs-dao")

class CatalogDao {
    Schema = mongooseService.getMongoose().Schema

    catalogSchema = new this.Schema({
       products:[{type:String, ref:"Product"}],
       sellerId:{type:String, index:true, ref:"Users", unique:true, select:false},
    }) 

    Catalog = mongooseService.getMongoose().model("Catalog", this.catalogSchema) 

    constructor() {
      log("New Catalog Doa Instance")
    }

    async add(fields:CreateCatalogDto){
        if( await this.Catalog.findOne({sellerId:fields.sellerId}) !== null){
         log("Duplicate Catalog Error")
         throw new Error("Seller already has a catalog ");  
        }
         const catalog  = new this.Catalog({...fields})
         // save  catalog
         await catalog.save()
         return catalog
    }

    async getCatalog(sellerId:string){
      let sellerCatalog =   await this.Catalog.findOne({sellerId})
        .populate({ path: "products", model: "Product" })
        .exec()
      log(sellerCatalog)
      if(sellerCatalog == null){
       log("catalog do not exist  ")
       throw new Error("Seller Catalog does not exist");  
      } 
      return sellerCatalog
  }
}

export default  new CatalogDao()