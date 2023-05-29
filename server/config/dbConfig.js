const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_url);
const connection = mongoose.connection;
connection.on('connected',()=>{
  console.log("db connect done")
})
connection.on('error',(err)=>{
  console.log("db connect error")
})
module.exports=connection;