import {Request, Response, NextFunction}  from 'express';
import debug,{IDebugger} from 'debug';
import argon2 from 'argon2';
import UsersService from '../../users/services/users.service';
import jwt from 'jsonwebtoken'


const tokenExpirationInSeconds = 36000;

const log:IDebugger =  debug("app:auth-controller")

class AuthController{
    async registerUser(req:Request , res:Response, next:NextFunction){
        log("body", req.body)
        try {
            req.body.password =  await argon2.hash(req.body.password)
            const userId =  await UsersService.createUser(req.body)
            res.status(201).send({userId})
        } catch (err) {
            next(err)
        }
    }
    async  loginJWT(req: Request, res: Response, next:NextFunction) {
      try {
            let jwtSecret =  process.env.JWT_SECRET || "DATA"
            log(jwtSecret);
            const token = jwt.sign(req.body, jwtSecret, {
                expiresIn: tokenExpirationInSeconds,
            });
            return res
                .status(201)
                .send({ accessToken: token});
        } catch (err) {
            log('createJWT error: %O', err);
            return next(err);
        }
    }

}


export default new AuthController()