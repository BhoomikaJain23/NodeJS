const fs = require("fs");

//it will the minimum thread size of the system
const os= require("os");
console.log(os.cpus().length);


// write in file

//synchronous call || blocking request
 //fs.writeFileSync("hello.txt","Hello World!"); //ye file create kr dega aur usme Hello World! likh dega

 //asynchronous call || non-blocking request
 //fs.writeFile("hello.txt","Hello   World async!",(err)=>{})//ye file create kr dega aur usme Hello World! likh dega

//read from file

 // ye sync isme return hota hai isliye m usko ek variable me store kr skti hu
//  const result=fs.readFileSync("./contacts.txt","utf-8")
//  console.log(result)


 //ye async hai to isme return nhi hota hai isliye hume callback function dena padta hai
//  fs.readFile("./contacts.txt","utf-8",(err,result)=>{
//     if(err){
//         console.log("Error",err);
//     }else{
//         console.log("Result:",result);
//     }   
//     })

//files me changes krna

//isse hello.txt me jo bhi content hoga uske baad new content add ho jayega joki isme date hai aaj ki
fs.appendFileSync("./hello.txt",new Date() .getDate() .toLocaleString())   

//copy of file
fs.copyFileSync("./hello.txt","./helloCopy.txt")

//delete file
//fs.unlinkSync("./helloCopy.txt")//isse helloCopy.txt file delete ho jayegi

//to check stats of file
console.log(fs.statSync("./hello.txt"));

