import debug from "debug";
import mongooseService  from "../../common/services/mongoose.service";
import { CreateCatalogDto } from "../dto/create.catalogs.dto";
const log:debug.IDebugger = debug("app::catalogs-dao")

class CatalogDao {
    Schema = mongooseService.getMongoose().Schema

    catalogSchema = new this.Schema({
       products:[{type:String, ref:"catalog"}],
       sellerId:{type:String, index:true, ref:"Users", unique:true},
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
      if( await this.Catalog.findOne({sellerId:sellerId}) == null){
       log("Seller Does not have a catalog ")
       throw new Error("Seller Does not have a catalog");  
      } 
      let sellerCatalogs =   await this.Catalog.findOne({sellerId}).exec()
      return sellerCatalogs
  }
}

export default  new CatalogDao()