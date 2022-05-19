import {Request, Response, NextFunction} from 'express'
import { UserType } from './common.user.types.enum'

class  CommonPermissionMiddleware{
  onlyExpectedUserTypeCanDoThisAction(expectedUserType:UserType){
      return ( req:Request, res:Response, next:NextFunction )=>{
          try {
              let userType =  parseInt(res.locals.jwt.userType)
              if(userType != expectedUserType) return res.status(403).send({errors:["Unauthorized access"]})
              next()
          } catch (error) {
            next(error)
          }
      }

  }
}
export default new CommonPermissionMiddleware()