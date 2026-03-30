const fs = require('fs');

function logReqRes(filename){
    return(req,res,next)=>{
        fs.appendFile(filename,`\n${Date.now()}: ${req.ip}: ${req.method}: ${req.path}`,(err,data)=>{
           next()
       })
 }  
  }

//middleware -custom
  // app.use((req,res,next)=>{
//  console.log("This is middleware 1");
//  return res.json({message:"This is middleware 1"});
// req.myUserName ="BhoomikaJain";
// next();
// })

// app.use((req,res,next)=>{
    // console.log("This is middleware 2",req.myUserName);
//     console.log("This is middleware 2");
//     next();
// });

module.exports = {
    logReqRes
};