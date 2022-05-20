import debug,{IDebugger} from "debug";
import catalogDaos from "../daos/catalog.daos";
import {CreateCatalogDto} from '../dto/create.catalogs.dto'

const log: IDebugger = debug('app:users-service');


class CatalogService{
   async createCatalogs(resource:CreateCatalogDto){
      return catalogDaos.add(resource)
   }

  async getCatalogs(sellerSlug:string){
      // return catalogDaos.getCatalog()
  }
}

export default new CatalogService();