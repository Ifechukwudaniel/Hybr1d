import debug from "debug";
import {NextFunction, Request, Response} from "express"
const log:debug.IDebugger = debug("app::error-middleware")

class CommonErrorHandlerMiddleWare {
    handleErrorAllError(err:Error, req:Request, res:Response, next:NextFunction){
        log("error", err)
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