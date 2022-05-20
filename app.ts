import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}


import  express ,{ Express, Request, Response } from 'express';
import {Server, createServer} from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from "cors"; 
import debug from 'debug';
import {serve, setup} from "swagger-ui-express"
const swaggerDocument = require("./doc.json");
import { AuthRoutes } from './auth/auth.routes.config';
import { CommonRoutesConfig } from './common/common.routes.config';
import { BuyersRoutes } from './buyers/buyers.routes.config';
import { SellerRoutes } from './sellers/sellers.routes.config';
import commonErrorHandlerMiddleware from './common/middleware/common.error.handler.middleware';

const log : debug.IDebugger = debug("app");
const app: Express = express();
const server : Server = createServer(app)
const port = process.env.PORT;
log(port)

// middleware to parse json
app.use(express.json());


//middleware from cross origin request
app.use(cors());

// expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
    if(typeof global.it == "function"){
      loggerOptions.level = 'http' // if its a test dont show logs 
    }
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

let routes: CommonRoutesConfig[]  = []

routes.push(new AuthRoutes(app))
routes.push(new BuyersRoutes(app))
routes.push(new SellerRoutes(app))

app.use("/", serve, setup(swaggerDocument));


export default server.listen(port, () => {
   log(`[server]: Server is running at https://localhost:${port}`);
   for (const route of routes) {
     log(`Route added  for `, route.getName())
   }
});

app.use(commonErrorHandlerMiddleware.handleErrorAllError);
app.use(commonErrorHandlerMiddleware.handleNotFound);