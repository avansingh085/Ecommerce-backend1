const mongoose = require('mongoose');

// Connect to MongoDB
const db=()=>{
    try{
mongoose.connect('mongodb+srv://avansingh085:SbhUyHjWETMpJWUN@cluster0.tyyrk.mongodb.net/Ecommerce', {
 
}).then((res)=>{console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")});
    }catch(err)
    {
        console.log("ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
    }
}
module.exports=db;