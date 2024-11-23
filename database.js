const mongoose = require('mongoose');
require('dotenv').config();
// Connect to MongoDB
const db=()=>{
    try{
mongoose.connect(process.env.MONGO_URL||"mongodb+srv://avansingh085:SbhUyHjWETMpJWUN@cluster0.tyyrk.mongodb.net/Ecommerce", {
 
}).then((res)=>{console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")});
    }catch(err)
    {
        console.log("ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
    }
}
module.exports=db;