const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");


const designerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter designer Name"],
        trim:true
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
    phone:{
        type:Number,
        required:[true,"Please enter designer's Phone Number"],
        minLength:[10,"Phone Number cannot be small then 10 Digits"],
        maxLength:[10,"Phone Number cannot exceed 10 Digits"]
    },
    address:{
        type:String,
        required:[true,"Please enter designer's Address"]
    },
    qualification:{
        type:String,
        required:[true,"Please enter designer's Qualifications"]
    },
    experience:{
       type:Number,
       required:[true,"Please enter your experience in years"] 
    },
    specialization:{
        type:String,
        required:[true]
    },
    identityProof:[
        {
            public_id:{
                type:Date,
                default:Date.now
            },
            url:{
                type:String,
                default: "https://res.cloudinary.com/abhishek27/image/upload/v1649656585/profile%20images/thor_ci5rq2.jpg",
                
            }
        }
    ],
    ratings:{
        type:Number,
        default:0
    },
    skills:{
        type:String,
        required:[true,"Please enter the Designer Category"]
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required:true,
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    images:[
        {
            public_id:{
                type:Date,
                default:Date.now,
            },
            url:{
                type:String,
                default: "https://res.cloudinary.com/abhishek27/image/upload/v1649364126/profile%20images/p5_oatpof.jpg",
            }
        }
    ],
    // category: {
    //     type: String,
    //     default:""
    //     // required: [true, "Please Enter Designer Category"],
    //   },
    createdAt:{
        type:Date,
        default:Date.now
    },
    role:{
        type:String,
        default:"designer",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

});


designerSchema.pre("save",async function(next){

    //check is password changed
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10)
})

//Genterate token
designerSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    }) //to create a secret key
}

//compare Password
designerSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}


//Generating Password Reset Token
designerSchema.methods.getResetPasswordToken = function() {
    
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


module.exports = mongoose.model("Designer",designerSchema);