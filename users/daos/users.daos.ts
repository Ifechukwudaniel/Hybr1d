import debug from "debug";
import { nanoid } from 'nanoid'
import slugify from "slugify";
import mongooseService  from "../../common/services/mongoose.service";
import {CreateUserDto} from '../dto/create.user.dto'

const log:debug.IDebugger = debug("app::users-dao")

class UserDao {
    Schema = mongooseService.getMongoose().Schema

    userSchema = new this.Schema({
       _id:String,
       email:{type:String, unique:true, required:true},
       password:{type:String , select:false},
       name:String,
       slug:{type:String, index:true},
       userType:Number
    }) 

    User = mongooseService.getMongoose().model("User", this.userSchema) 
    constructor() {
        log("New User Doa Instance")
    }

    async add(userFields:CreateUserDto) {

      // check if email exists
       if(await this.User.findOne({ email: userFields.email}) != null){
          log("Duplicate Email Error")
          throw new Error("Email Id has be used");  
       }
       
       let userId:String = nanoid()
       let slug:String = ""

       // generate slug for user
       if(userFields.userType === 1) slug = slugify(`${userFields.name} ${nanoid(5)}`,`-`)

       const user  = new this.User({_id: userId, slug, ...userFields})

       // save user
       await user.save()
       return userId
    }

  async list(limit=20, page=0, query={} ){
      return this.User.find(query)
      .limit(limit)
      .skip(limit*page)
      .exec()
  }
}

export default  new UserDao()