import debug,{IDebugger} from "debug";
import usersDaos from "../../users/daos/users.daos";
import { CreateUserDto } from "../dto/create.user.dto";

const log: IDebugger = debug('app:users-service');


class UserService{
    async getSellers(limit:number, page:number) {
         return usersDaos.list({userType:1},limit,page)
    }

   async createUser(resource:CreateUserDto){
      return usersDaos.add(resource)
   }

   async getUserByEmailWithPassword(email:string) {
      return usersDaos.getUserByEmailWithPassword(email)
   }
}

export default new UserService();