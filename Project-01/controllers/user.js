const User = require("../models/user");

async function handleGetAllUsers(req,res){
    const allDBUsers = await User.find({});
    // console.log(req.myUserName);  // we can make changes in in request in middleware and can access them here also
    res.setHeader("X-MyName","BhoomikaJain"); // custom header
    return res.json(allDBUsers);  
}

async function handleGetUserById(req,res){
    //before connecting to DB
//     const id =Number( req.params.id);
//   const user = users.find((user)=>user.id ==id);
  //after connecting to DB
  const user = await User.findById(req.params.id);
  if(!user) return res.status(404).json({message:"User not found"});
     return res.json(user);
}

async function handleUpdateUserById(req,res){
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
}

async function handleDeleteUserById(req,res){
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({ status: "deleted" });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

async function handleCreateUser(req,res){
     const body = req.body;

   if(!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
    return res.status(400).json({status:"failure",message:"All fields are required"});
   }

   const result = await User.create(body);

   return res.status(201).json({
       status: "success",
       id: result._id
   });
}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser
}
