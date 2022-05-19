import {Request, Response, NextFunction}  from 'express';
import debug,{IDebugger} from 'debug';
import argon2 from 'argon2';
import UsersService from '../../users/services/users.service';

const log:IDebugger =  debug("app:auth-controller")

class AuthController{
    async registerUser(req:Request , res:Response, next:NextFunction){
        log("body", req.body)
        try {
            req.body.password =  await argon2.hash(req.body.password)
            const userId =  await UsersService.createUser(req.body)
            res.status(201).send(userId)
        } catch (err) {
            let error =  ""
            if (typeof err === "string")  error =  err.toUpperCase() 
            if ( err  instanceof Error)  error =  err.message
            else error= "Please an error occurred"
            log("register error: %0",err)
            res.status(500).send({error})
        }
    }

}


export default new AuthController()