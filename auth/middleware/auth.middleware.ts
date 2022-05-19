import {Request,Response,NextFunction} from 'express'
import usersService from '../../users/services/users.service';
import argon2 from 'argon2';

class AuthMiddleWare {
  async validateBodyRequest(req:Request, res:Response, next:NextFunction)  {
      if(req.body.email && req.body.password)  next()
      else {
          res.status(400).send({ errors:['Missing required field: email && password'] })
      }
  }

  async validateUserPassword(req:Request, res:Response, next:NextFunction){
      // find user by password
      const user = await usersService.getUserByEmailWithPassword(req.body.email)

      // error if no user
      if(!user)  return res.status(400).send({errors:["Invalid email address"]})

      // handle  final login
      if( await argon2.verify(user.password,req.body.password)){
        req.body = {userId : user._id, provider:"email", email:user.email, userType:user.userType, }
        return next()
      }
      else return res.status(400).send({errors:['Incorrect Password']})

   }
}

export default new AuthMiddleWare();