import {NextFunction, Request, Response} from "express"

class CommonErrorHandlerMiddleWare {
    handleErrorAllError(err:Error, req:Request, res:Response, next:NextFunction){
          return res.status(500).send({
            errors: [err.message],
          });
    }

     handleNotFound(req:Request, res:Response){
        return  res.status(404).json({
            errors: ["This route was not found"],
          });
     }
}

export default new  CommonErrorHandlerMiddleWare() 