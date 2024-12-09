const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const PORT = 3001;
const {connectMongoDB} = require("./config/db");
const bodyParser = require("body-parser")
const userRouter = require("./controllers/user");




app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



connectMongoDB();

app.use(userRouter);
server.listen(PORT,()=>{
    console.log(`Server is listening to PORT ${3000}`);
})