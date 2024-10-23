const nodemailer = require('nodemailer');
const cron = require('node-cron');
require('dotenv').config();
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'avansingh085@gmail.com',
        pass:process.env.EMAIL_PASSWORD,
    },
});
cron.schedule('* * * * *', () => { 
    console.log('Running cron job...');
})

 const sendNotification=(req,res)=>{
    try{
        const {subject,useremail,message}=req.body;
        let mailOptions = {
         from: 'avansingh085@gmail.com',
         to: useremail,
         subject: subject,
         text:message,
     };
        transporter.sendMail(mailOptions,function(error, info) {
         if (error) {
            return res.status(500).send({success:false,result:"somthing error for send notification"});
         } else {
            return res.status(200).send({success:true,result:"you are success fully send notification"});
         }
     });
    } catch(err)
    {
       return res.status(500).send({success:false,result:"somthing error for send notification"});
    }
     }
   
module.exports={sendNotification}
