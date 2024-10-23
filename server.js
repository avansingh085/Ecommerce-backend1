const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json({ limit: '1mb' }))
app.use(express.json());
const port = 5500;
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const springedge = require('springedge');
app.set('view engine', 'ejs');
var val = 1;
const path = require("path");
const static_path = path.join(__dirname, "public");
app.use(express.static(static_path));
app.use(express.urlencoded({ extended: true }));
const bcrypt = require("bcrypt")
const session = require("express-session");
const cookieParser = require("cookie-parser");
const controller = require("./controller.js");
app.use(express.json());
app.use(cookieParser());
const db = require('./database.js');
db();
const {sendNotification} =require('./notification.js');
//NO ched khani
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/createOrder', controller.createOrder);
app.post('/verifyPayment', controller.verifyPayment);
app.post("/addCart", controller.addCart);
app.get("/sendCart", controller.sendCart);
app.get("/removeCart", controller.removeCart)
app.post("/AddComment", async (req, res) => {
  res.send("hellow");
})
app.get("/sendData", controller.sendData);
app.post('/signup', controller.signup);
app.post('/login', controller.login);

app.post('/updateAddress', controller.updateAddress);
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.send('Logged out successfully');
});
app.post('/updateItemQuantity', controller.updateItemQuantity);
app.get("/getAddress", controller.getAddress);
app.get('/verifyToken', controller.verifyToken);
app.post("/sendNotification",sendNotification)
app.listen(5500, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


































