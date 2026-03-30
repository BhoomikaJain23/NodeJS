const express = require('express');
const fs = require('fs');


const connectMongoDb = require("./connection");
const { logReqRes } = require('./middlewares');
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;




//CONNECTION

connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")
.then(()=>{
    console.log("Connected to MongoDB");
})


//Schema



//middleware -plugin
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use(logReqRes("log.txt"));


//Routes

app.use("/api/users",userRouter)


app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));
