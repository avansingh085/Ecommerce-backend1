const mongoose = require('mongoose');

// Connect to MongoDB
const db=()=>{
    try{
mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((res)=>{console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")});
    }catch(err)
    {
        console.log("ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
    }
}
module.exports=db;