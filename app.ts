import  express ,{ Express, Request, Response } from 'express';
import {config} from 'dotenv';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from "cors"; 
import debug from 'debug'
import MongooseService from './src/services/common/mongoose.service';


const log : debug.IDebugger = debug("app");

config();

const app: Express = express();
const port = process.env.PORT;
MongooseService

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

// if (!process.env.DEBUG) {
//     loggerOptions.meta = false; // when not debugging, log requests as one-liners
// }

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});