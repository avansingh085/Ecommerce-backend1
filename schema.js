const mongoose=require('mongoose');
const ProductSchema = new mongoose.Schema({
    id: { type: Number, required: true },                // Product name
    title: { type: String, required: true },               // Short product title
    price: { type: Number, required: true },               // Product price
    description: { type: String },                         // Detailed description
    image: { type: String },                            // Image URL for the product
    stock: { type: Number, required: true },               // Product stock count
    
    // Comments section with user and comment text
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        comment: { type: String, required: true },
        date: { type: Date, default: Date.now }
      }
    ],
  
    // Rating information
    rating: {
      rate: { type: Number, default: 0 },                   // Average rating (e.g., 4.5)
      count: { type: Number, default: 0 }                   // Number of ratings given
    },
  
    createdAt: { type: Date, default: Date.now },           // Product creation timestamp
    updatedAt: { type: Date, default: Date.now }            // Last updated timestamp
  });
  
//USER MODEL
const UserSchema = new mongoose.Schema({
  username:{ type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  address:[{name:{type:String},city:{type:String},zipcode:{type:Number},mobile:{type:Number},street:{type:Number},state:{type:String}}],
  orderHistory: [{productId:{type:String},quantity:{type:Number,default:0}}],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

  
  const CartSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{productId:{type:String},quantity:{type:Number,default:0}}],
    totalPrice: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
module.exports ={CartSchema,UserSchema,ProductSchema};
