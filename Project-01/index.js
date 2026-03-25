const express = require('express');
const fs = require('fs');
// const users= require('./MOCK_DATA.json');
const { default: mongoose } = require('mongoose');
const { type } = require('os');
const { time } = require('console');

const app = express();
const PORT = 8000;

//CONNECTION

mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error", err));

//Schema

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String
    },
    job_title:{
        type : String
    },
},
{timestamps:true
}
);

const User = mongoose.model("User",userSchema);

//middleware -plugin
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//middleware -custom

app.use((req,res,next)=>{
    fs.appendFile("log.txt",`\n${Date.now()}: ${req.ip}: ${req.method}: ${req.path}`,(err,data)=>{
    next()
})
})
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


//Routes

app.get('/users',async (req,res)=>{
    const allDBUsers = await User.find({})
  const html= `
  <ul>
    ${allDBUsers.map((user)=>`<li>${user.first_name}-${user.email}</li>`).join('')}
  </ul>
  `;
  return res.send(html);
})

//REST API
app.get('/api/users',async (req,res)=>{
    const allDBUsers = await User.find({});
    // console.log(req.myUserName);  // we can make changes in in request in middleware and can access them here also
    res.setHeader("X-MyName","BhoomikaJain"); // custom header
    return res.json(allDBUsers);  
})

app.route("/api/users/:id")
.get(async(req,res)=>{
    //before connecting to DB
//     const id =Number( req.params.id);
//   const user = users.find((user)=>user.id ==id);
  //after connecting to DB
  const user = await User.findById(req.params.id);
  if(!user) return res.status(404).json({message:"User not found"});
     return res.json(user);
})

.patch(async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({ status: "updated", user: updatedUser });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

.delete(async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({ status: "deleted" });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

// app.get("/api/users/:id",(req,res)=>{
//     const id =Number( req.params.id);
//     const user = users.find((user)=>user.id ==id);
//     return res.json(user);
// })

app.post('/api/users', async (req, res) => {
   const body = req.body;

   if(!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
    return res.status(400).json({status:"failure",message:"All fields are required"});
   }

   const result = await User.create(body);

   return res.status(201).json({
       status: "success",
       id: result._id
   });
});
//    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
//     return res.status(201).json({status:"success",id: users.length});
//    })

// app.patch("/api/users/:id",(req,res)=>{
//     //TODO: EDIT THE USER WITH ID
//     return res.json({status:"pending"});
// })

// app.delete("/api/users/:id",(req,res)=>{
//     //TODO: DELETE THE USER WITH ID
//     return res.json({status:"pending"});
// })


app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));
