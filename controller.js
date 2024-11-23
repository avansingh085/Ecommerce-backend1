const {CartSchema,UserSchema,ProductSchema}=require('./schema.js');
const mongoose=require('mongoose');
const Users=mongoose.model('User',UserSchema);
const Cart=mongoose.model('Cart',CartSchema);
const Product=mongoose.model('Product',ProductSchema);
//const cartItem=mongoose.model('CartItem',CartItemSchema);
const jwt=require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Razorpay=require('razorpay');
require(".env").config();
//console.log(process.env.RAZORPAY_KEY_ID)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID||"rzp_test_hI0niYSDJZ36yP",
  key_secret: process.env.RAZORPAY_KEY_SECRET||"lNO8H673Whw7DFiNC2gKV2Xo"
});
const createOrder = async (req, res) => {
  const { amount } = req.body;
  if (!amount) {
    return res.status(400).json({ error: 'Amount is required' });
  }
const getData=async (req,res)=>{
        try{
             let prod=await Product.find({});
           return  res.send({data:prod});
        }
         catch(err){
         return  res.status(400).send({err:"data not fetch ",data:[]});
         }
}
  const options = {
    amount: amount * 100, 
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}` 
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing required payment fields' });
  }

  const secret = process.env.RAZORPAY_KEY_SECRET;
  
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generatedSignature = hmac.digest('hex');

  if (generatedSignature === razorpay_signature) {
    res.json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'failure', error: 'Signature verification failed' });
  }
};

const getData=async (req,res)=>{
  try{
       let data=await Product.find({});
       console.log(data,"van");
       return res.send({data});
  }catch(err)
  {
    return res.status(500).send({result:"not found",data:[]});
  }
}
// const createOrder=async (req, res) => {
//     const options = {
//       amount: req.body.amount * 100, 
//       currency: 'INR',
//       receipt: 'receipt_order_74394'
//     };
//     try {
//       const order = await razorpay.orders.create(options);
//       res.json(order);
//     } catch (error) {
//       console.log(error);
//       res.status(500).send(error);
//     }
//   }


// const verifyPayment=(req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
//     const hmac = crypto.createHmac('sha256', key_secret);
//     hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
//     const generatedSignature = hmac.digest('hex');
  
//     if (generatedSignature === razorpay_signature) {
//       res.json({ status: 'success' });
//     } else {
//       res.json({ status: 'failure' });
//     }
//   }

  const login=async (req, res) => {
    try {
      console.log("AVAN")
 const { username, password } = req.body;
 const user =await Users.findOne({ username:username });
 console.log("AVAN",user)
 if (!user) {
 return res.send({ success:false });
 }
 const passwordMatch = await bcrypt.compare(password, user.passwordHash);
 console.log(passwordMatch)
 if (!passwordMatch) {
 return res.send({ success:false,
    result:"password is not correct"
  });
 }
 const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET||"189ac7bcf390094e24315f5302e07ed2d4853d27cbb3f7bdaf532f86d8025fecf3079c8fbcaa1d4166dbd783d84c1a4512e1a89810f77f7ada0a0a39e343ccfb31c066aa9d1dda3fd13f1354425745a7708cfcb6ec94109336327d0797a1e30ace0b77f82be6f1782d96ff1785e3bfe4896e24a480b02129e4ef3076bcf47d9c3bc3f0811550392eed1664ca57c47368ed48f77e9faf124ac517f51015669e9f031b5bf8fbc92a5ca12abb6133b72e0423e1538d5b31fa2209140d6594be451b6bef2da76ccb60d844cdf84a0f303f2b853de19574688a4ada6b9120556ebbd413fcbd7c26c5e7952477dc4b5348124da0c1a5cfd41ef4a8d446c771c70b820f", {
 expiresIn: '1h',
 });
 return res.send({ success:true,token :token});
 } catch (error) {
return res.status(2000).send({ success:false,error:error });
 }
return res.send({name:"coorect"});
  }


  const verifyToken=(req,res)=>{
   let token=req.query.token;
   console.log(token,"token")
   if(!token)
       res.send({success:false});
  try{
     const verified = jwt.verify(token, process.env.JWT_SECRET||"189ac7bcf390094e24315f5302e07ed2d4853d27cbb3f7bdaf532f86d8025fecf3079c8fbcaa1d4166dbd783d84c1a4512e1a89810f77f7ada0a0a39e343ccfb31c066aa9d1dda3fd13f1354425745a7708cfcb6ec94109336327d0797a1e30ace0b77f82be6f1782d96ff1785e3bfe4896e24a480b02129e4ef3076bcf47d9c3bc3f0811550392eed1664ca57c47368ed48f77e9faf124ac517f51015669e9f031b5bf8fbc92a5ca12abb6133b72e0423e1538d5b31fa2209140d6594be451b6bef2da76ccb60d844cdf84a0f303f2b853de19574688a4ada6b9120556ebbd413fcbd7c26c5e7952477dc4b5348124da0c1a5cfd41ef4a8d446c771c70b820f");
     if(!verified)
     {
        res.send({success:true})
     }
     else
     {
        res.send({success:true})
     }
   }catch(err){
    console.log(err);
     res.status(500).send({success:false});
   }

  }


  const signup= async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password){
      return res.send({
        success:false,
        result:"please fill all information"
      });
    }
   // console.log(await Users.findOne({}),"avan")
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
        console.log("existuser",existingUser);
      return res.send({
        success:false,
        result:"user alredy exist"
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser=new Users({
        username:username,
        passwordHash:passwordHash
        });
     await newUser.save();
     let user=await Users.find({username:username});
     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET||"189ac7bcf390094e24315f5302e07ed2d4853d27cbb3f7bdaf532f86d8025fecf3079c8fbcaa1d4166dbd783d84c1a4512e1a89810f77f7ada0a0a39e343ccfb31c066aa9d1dda3fd13f1354425745a7708cfcb6ec94109336327d0797a1e30ace0b77f82be6f1782d96ff1785e3bfe4896e24a480b02129e4ef3076bcf47d9c3bc3f0811550392eed1664ca57c47368ed48f77e9faf124ac517f51015669e9f031b5bf8fbc92a5ca12abb6133b72e0423e1538d5b31fa2209140d6594be451b6bef2da76ccb60d844cdf84a0f303f2b853de19574688a4ada6b9120556ebbd413fcbd7c26c5e7952477dc4b5348124da0c1a5cfd41ef4a8d446c771c70b820f", {
        expiresIn: '1h',
        });
    res.send({success:true,info:"registered",token:token});
  };

  const addCart=async (req,res)=>{
   
    const {product,quantity,username}=req.body;
   
    try
    {
   
         let prob=await Product.findOne({id:product});
        
       let pid=prob._id;
        let d=await Users.findOne({username:username});
      
        let id=d._id;
       let isExist=await Cart.findOne({username:id})
       if(!isExist)
       {
         let c=new Cart({username:id,items:[{productId:pid,quantity:quantity}],totalPrice:(prob.price*quantity)})
         let re=await c.save();
         console.log(re)
       }
       else{
       let item=isExist.items;
       let flag=false;
        for(let i=0;i<item.length;i++)
        {
          if(item[i].productId==pid)
          {
            flag=true;
            isExist.items[i].quantity+=quantity;
            isExist.totalPrice+=(isExist.items[i].quantity)*(prob.price);
           await isExist.save();
            break;
          }
        }
        if(!flag)
{    isExist.items.push({productId:pid,quantity:quantity});
        isExist.totalPrice+=(quantity)*(prob.price);
        await isExist.save();
}
        let result=await isExist.save();
        console.log(result);
       }
        return res.send({success:true,result:"correct"});
    }
    catch(err)
    {
      console.log(err)
       return res.status(500).send({success:false,result:"cart not push"});
    }
   return res.send({success:true,result:"correct"});
  }
  
  const sendCart=async (req,res)=>{
    try{
     // console.log(req.query)
      let user=await Users.findOne({username:req.query.username})
      let cartData=await Cart.findOne({username:user._id});
     // console.log(cartData);
      return res.send(cartData);
    }
    catch(err){
      return  res.status(500).send({success:false});
    }
  }
  const sendData=async (req,res)=>{
    console.log("OPPPP")
    let isFind=await Product.findOne({_id:req.query.productId});
      
    console.log("AVAN");
    if(isFind)
    {
      //console.log(isFind);
     return res.send(isFind);
    }
    else
    {
     return res.status(500).send({success:false,result:"data fail to send"});
    }
  }



  const removeCart=async (req,res)=>{
      const {username,productId}=req.query;
       console.log(req.query);
      try{
      let user=await Users.findOne({username:username});
      if(!user)
        return res.send({success:false,result:"user not found"});
      //console.log("LLLLLLLLLLLLLLLLLLLLLLLLL",user)
      let cart=await Cart.findOne({username:user._id});
      
      let newItem=cart.items.filter((item)=>{
        return item.productId!=productId;
      })
       cart.items=newItem;
     await  cart.save();
    
     return res.send({success:true,result:"success"})
    }
    catch(err)
    {
      console.log("ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
           return res.status(500).send({success:false,result:"fail to remove item"})
    }
  }

  const updateAddress=async (req,res)=>{
    const {name,city,zip,street,mobile,_id,username,state}=req.body;
     console.log(req.body);
     try{
     let user=await Users.findOne({username:username});
       if(!user)
       {
        return res.send({success:false,result:"user not exist"});
       }
       let add=user.address;
       let flag=false;
       console.log(user)
       for(let i=0;i<add.length;i++)
       {
        if(add[i]._id==_id)
        {
          add[i].city=city;
       add[i].mobile=mobile;
       add[i].zipcode=zipcode;
       add[i].name=name;
       flag=true;
        }
       }
       if(!flag)
       {
      add.push({city:city,name:name,zipcode:zip,street:street,mobile:mobile,state:state});
      }
       user.address=add;
      await user.save();
   return res.send({success:false,result:"wrong ans"});
     }catch(err)
     {
      console.log(err)
      return res.status(500).send({success:false});
     }

    }
    

    // getaddresss
    const getAddress=async (req,res)=>{
          try{
            console.log(req.query);

            let user=await Users.findOne({username:req.query.username});
            console.log(user)
            if(!user)
            {
              return res.send({success:false,result:"user not exist"});
            }
            return res.send(user.address);
          }
          catch(err)
          {
              return res.status(500).send({success:false,result:"not fetch getadrress"});
          }
    }
    const updateItemQuantity= async(req,res)=>{
      try{
            const {username,productId,quantity}=req.body;
            console.log(req.body);
            let isExistUser=await Users.findOne({username:username});
            if(isExistUser)
            {
              //console.log(isExistUser);
                  let cart=await Cart.findOne({username:isExistUser._id});
                  console.log(cart,"AVAN");
                  let items=cart.items;
                  if(cart)
                  {
                   for(let i=0;i<items.length;i++)
                   {
                    if(items[i].productId==productId)
                    {
                      items[i].quantity=quantity;
                    }
                   }
                    cart.items=items;
                    await cart.save();
                    res.status(200).send({success:true,result:"operation successfully exicuted"})
                  }
                  else
                  {
                    console.log("user cart not found");
                    res.status(500).send({success:false,result:"user cart not found"});
                  }
            }
            else{
              console.log("user not exit");
              res.status(500).seond({success:false,result:"user not exist"});
            }
      }
      catch(err){
        res.status(500).send({success:false,result:"somthing error in backend updateItemQuantity"});
      }
    }
  module.exports={updateItemQuantity,getData,createOrder,verifyPayment,signup,login,verifyToken,addCart,sendCart,removeCart,sendData,updateAddress,getAddress};
