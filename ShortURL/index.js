const express = require('express');
const {connectToMongoDB} = require('./connect');
const urlRouter = require('./routes/url');
const URL = require('./models/url');

const app = express();
const Port = 8001;

connectToMongoDB("mongodb://localhost:27017/shorturl").then(()=>{
    console.log("Connected to MongoDB");
})

app.use(express.json());

app.use("/url", urlRouter);

app.use("/:shortid",async (req,res)=>{
  const shortid = req.params.shortid;
  const entry = await URL.findOneAndUpdate(
    {
    shortid:shortid,
  },{
    $push:{visitHistory:{timestamp:Date.now()}}
  })
  res.redirect(entry.redirectURL);
})

app.listen(Port, () => {
  console.log(`ShortUrl service is running on port ${Port}`);
});

