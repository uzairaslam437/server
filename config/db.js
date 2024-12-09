const mongoose = require("mongoose");
const dotenv = require("dotenv").config();


function connectMongoDB (){
    try{
        mongoose.connect("mongodb://127.0.0.1:27017/demo")
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.log(`Error:${err}`)
    }
}
module.exports = {connectMongoDB};


