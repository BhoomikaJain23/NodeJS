const http = require("http");
// const fs= require("fs")
// const url=require("url");
const express = require("express")

const app = express();

app.get('/',(req,res)=>{
    return res.send("Hello from Home Page")
})

app.get('/about',(req,res)=>{
    return res.send(`Hello ${req.query.name}`)
})

app.listen(8000,()=>console.log("Server started"));


function myHandler(req,res){
     if(req.url==='/favicon.ico'){
        res.end();
        return;
    }
    const log=`${Date.now()}:${req.method} ${req.url} New Req Received\n`
    const myUrl=url.parse(req.url,true);
    // console.log(myUrl);
    
    fs.appendFile('log.txt', log, (err,data)=>{
        if(err){
            res.end("Internal Server Error");
            return;
        }

       switch(myUrl.pathname){

        case '/':
        if(req.method === 'GET')
        res.end("HomePage");
        break;

        case '/about':
        const username=myUrl.query.myname;   
        res.end(`Hi,${username}`)
        break;

        case '/search':
        const search = myUrl.query.search_query;
        res.end("Here are your results for " + search)
        break;

        case '/signup' :
        if(req.method==='GET')
        res.end("This is a signup form")
        else if(req.method==="POST")
            //DB Query
        res.end("SUCCESS")    

        default:
        res.end("404 NotFound");
      }
    })
}

// const myServer = http.createServer(app);

// myServer.listen(8000,()=>console.log('Server Started on Port 8000'));