const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Name cannot exceed 30 Characters"],
        minLength:[4,"Name should have more than 4 Characters "]
    },

    email:{
        type:String,
        required:[true,"Please enter Email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid Email"]
    },
    password:{
        type:String,
        required: [true,"Enter your password"],
        minLength: [4,"Name should have more than 4 Characters "],
        maxLength: [6,"Password cannot exceed 6 characters"],
        select: false,
    },
    avatar:{
        public_id: {
            type:Date,
            default:Date.now
        },
        url:{
            type:String,
            default:"https://res.cloudinary.com/abhishek27/image/upload/v1649332453/avatars/avtr_fvhwqs.jpg"
        }
    },
    role:{
        type:String,
        default:"user",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save",async function(next){

    //check is password changed
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10)
})


//JWT TOKEN
//to store the value in cookies

//Genterate token
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    }) //to create a secret key
}

//compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}


//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function() {
    
    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hashing and adding to user Schema
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire = Date.now() + 15*60*1000;

    return resetToken;
};

module.exports= mongoose.model("User",userSchema);