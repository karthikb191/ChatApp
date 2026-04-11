// var createError = require('http-errors');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

import express from 'express';
import path from 'path'
import dotenv from 'dotenv'

//TODO: Use .env file once we have database setup
import config from './../Config.json' with { type: 'json' }


//Application route imports
import indexRouter from './routes/index.route.js';
import authRoute from './routes/auth.route.js'

//Databases
import { ConnectMongoDB } from './lib/ConnectDB.js';


dotenv.config();
var PORT = process.env.PORT;
const __dirName = path.dirname(import.meta.dirname);

// Creates an express application
var app = express();

//This is used to parse the request body
app.use(express.json());

//Routing setup
app.use("/", indexRouter);
app.use("/api/auth/", authRoute);

//view engine setup
app.set('views', path.join(__dirName, 'views'));
app.set('view engine', 'jade');

// Serves static files to clients
app.use(express.static(path.join(__dirName, 'public')));


app.listen(PORT, 
    (error) =>
    {
        if(error)
        {
            console.error("Received error: " + error.message);
            return;
        }
        
        console.log("Server is running");
        ConnectMongoDB();
    }
)

export default app;
