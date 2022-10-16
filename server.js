require("dotenv").config();
const express = require('express');
const server = express();
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const connectDatabase = require("./connections/db");
const {WHITELIST} = process.env;
const whiteList = JSON.parse(WHITELIST);
const CORS_OPTION = {
    origin : function (origin, callback) {
        console.log(callback);
        if(whiteList.indexOf(origin) !== -1){
            callback(null, true);
        }else{
            callback(new Error("Cors Disabled access to this endpoint")); 
        }
    },
    optionsSuccessStatus: 200
}
server.use(express.json()); //allow us to read the request body
server.use(express.urlencoded({extended:true})); // allow for query strings
server.use(cors(CORS_OPTION)); //
connectDatabase();











server.listen(PORT, ()=>{
    console.log("listening on port ",PORT );
});