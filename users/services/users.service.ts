import debug,{IDebugger} from "debug";
import usersDaos from "../../users/daos/users.daos";
import { CreateUserDto } from "../dto/create.user.dto";

const log: IDebugger = debug('app:users-service');


class UserService{
    async getSellers(limit:number, page:number) {
         return usersDaos.list(limit,page,{userType:1})
    }

   async createUser(resource:CreateUserDto){
      return usersDaos.add(resource)
   }
}

export default new UserService();