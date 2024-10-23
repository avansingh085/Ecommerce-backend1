const mongoose = require('mongoose');
require('dotenv').config();
// Connect to MongoDB
const db=()=>{
    try{
mongoose.connect(process.env.MONGO_URL, {
 
}).then((res)=>{console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")});
    }catch(err)
    {
        console.log("ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
    }
}
module.exports=db;