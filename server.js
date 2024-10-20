const mongoose = require('mongoose');
const express=require('express');
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json({limit:'1mb'}))
app.use(express.json());
 const port = 5500; 
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
 const crypto = require('crypto');
 const springedge=require('springedge');
app.set('view engine','ejs');
var val=1;
const path = require("path"); 
const static_path = path.join(__dirname, "public"); 
app.use(express.static(static_path)); 
app.use(express.urlencoded({ extended: true })); 
const bcrypt = require("bcrypt")
const session = require("express-session");
const cookieParser = require("cookie-parser");
const controller=require("./controller.js");
const db=require('./database.js');
db();
const {CartSchema,CartItemSchema,UserSchema,ProductSchema,}=require('./schema.js');
const saltRounds = 10
//NO ched khani
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Users=mongoose.model('User',UserSchema);
let key_id="rzp_test_099LgMWWQ1DioF";
let key_secret="rN6XJaPT0jTim9i9MAEmUNRC";


const razorpay = new Razorpay({
  key_id: key_id,
  key_secret: key_secret
});

app.post('/createOrder', controller.createOrder);
app.post('/verifyPayment', controller.verifyPayment);

const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cookieParser());
const JWT_SECRET = '5363f41f26f63bd0ba4acdc966e1046e2246d57ce4a7ccc41f7ce3f1e9f2cafc23dcdd166ceef8e0e133bf5d46fdb4d1b6d11598a5c08d9bad191a95ec420c43';
const TOKEN_EXPIRY = '50m'; 

const axios=require('axios');
//const Users=mongoose.model('User',UserSchema);

const Cart=mongoose.model('Cart',CartSchema);
const Product=mongoose.model('Product',ProductSchema);
app.post("/addCart",controller.addCart);
app.get("/sendCart",controller.sendCart);
app.get("/removeCart",controller.removeCart)
app.post("/AddComment",async (req,res)=>{
   res.send("hellow");
})
app.get("/sendData",controller.sendData);

app.post('/signup',controller.signup);
app.post('/login',controller.login);
app.get("/getData",(req,res)=>{
 res.send([]);
});

app.post('/updateAddress',controller.updateAddress);
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.send('Logged out successfully');
});
app.get('/updateItemQuantity',controller.updateItemQuantity);
app.get("/getAddress",controller.getAddress);
app.get('/verifyToken', controller.verifyToken);

app.listen(5500, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


































