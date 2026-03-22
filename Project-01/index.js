const express = require('express');
const fs = require('fs');
const users= require('./MOCK_DATA.json');

const app = express();
const PORT = 8000;

//middleware -plugin
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routes

app.get('/users',(req,res)=>{
  const html= `
  <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join('')}
  </ul>
  `;
  return res.send(html);
})

//REST API
app.get('/api/users',(req,res)=>{
    return res.json(users);
})

app.route("/api/users/:id")
.get((req,res)=>{
    const id =Number( req.params.id);
  const user = users.find((user)=>user.id ==id);
     return res.json(user);
})
.patch((req, res) => {
    const id = Number(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.json({ message: "User not found" });
    }

    user.first_name = req.body.first_name || user.first_name;
    user.last_name = req.body.last_name || user.last_name;
    user.email = req.body.email || user.email;
    user.gender = req.body.gender || user.gender;
    user.job_title = req.body.job_title || user.job_title;

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), () => {
        res.json({ status: "updated", user });
    });
})
.delete((req, res) => {
    const id = Number(req.params.id);

    const newUsers = users.filter(u => u.id !== id);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(newUsers), () => {
        res.json({ status: "deleted" });
    });
})

// app.get("/api/users/:id",(req,res)=>{
//     const id =Number( req.params.id);
//     const user = users.find((user)=>user.id ==id);
//     return res.json(user);
// })

app.post('/api/users',(req,res)=>{
   const body =req.body;
   users.push({...body,id: users.length+1});
   fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    return res.json({status:"success",id: users.length});
   })
})

// app.patch("/api/users/:id",(req,res)=>{
//     //TODO: EDIT THE USER WITH ID
//     return res.json({status:"pending"});
// })

// app.delete("/api/users/:id",(req,res)=>{
//     //TODO: DELETE THE USER WITH ID
//     return res.json({status:"pending"});
// })


app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));
