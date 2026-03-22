const express = require('express');
const users= require('./MOCK_DATA.json');

const app = express();
const PORT = 8000;

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
    //TODO:CREATE NEW USER
    return res.json({status:"pending"});
})
.patch((req,res)=>{
    //TODO: EDIT THE USER WITH ID
    return res.json({status:"pending"});
})
.delete((req,res)=>{
      //TODO: DELETE THE USER WITH ID
    return res.json({status:"pending"});
})

// app.get("/api/users/:id",(req,res)=>{
//     const id =Number( req.params.id);
//     const user = users.find((user)=>user.id ==id);
//     return res.json(user);
// })

app.post('/api/users',(req,res)=>{
    //TODO:CREATE NEW USER
    return res.json({status:"pending"});
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
