const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    orderKey:{
        type:String,
        required: true,
    },
    companyName: {
        type: String, required: true ,
        required: true
    },
    companyEmail:{
        type:String
    },
    orderType:  {
        type: String,
        required:[true,"example- LOGO, Banner, Typography"]
        },
    orderDescription:{
            type: String,
            required: true,
        },
    orderStatus:{
        type: String,
        default:"pending",
        required:true,
    },
    advancePayment:{
            type: Number,
            default:1000,
    },
    totalPrice:{
            type: Number,
            default:0,
    },
    
    orderDate : { 
        type: Date, default: Date.now 
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    }
    


});

module.exports = mongoose.model("Order",orderSchema);