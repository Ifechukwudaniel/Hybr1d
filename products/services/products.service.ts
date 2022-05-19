import debug,{IDebugger} from "debug";
import productsDaos from "../daos/products.daos";
import {CreateProductDto} from '../dto/create.products.dto'
const log: IDebugger = debug('app:users-service');


class ProductService{
   async createProduct(resource:CreateProductDto){
      return productsDaos.add(resource)
   }
}

export default new ProductService();