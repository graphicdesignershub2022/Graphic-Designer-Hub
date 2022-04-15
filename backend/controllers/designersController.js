const Designer = require("../models/designerModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const sendDToken = require("../utils/jwtToken");
const { validate } = require("../models/designerModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


//Register a Designer
exports.registerDesigner = catchAsyncError( async(req,res,next)=>{

    const { name,email,password,phone,address,qualification,experience,specialization,identityProof,skills,images} = req.body;
    const designer = await Designer.create({
        name,email,password,phone,address,
		qualification,experience,specialization,
		identityProof,
		skills,
		images
    });
    //token creation for cookie
    sendDToken(designer,201,res);

});


// Login Designer
exports.loginDesigner = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
  
    // checking if designer has given password and email both
  
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
  
    const designer = await Designer.findOne({ email }).select("+password");
  
    if (!designer) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await designer.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    sendDToken(designer, 200, res);
  });
  
  // Logout Designer
  exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });


  // Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const designer = await Designer.findOne({ email: req.body.email });
  
    if (!designer) {
      return next(new ErrorHandler("Designer not found", 404));
    }
  
    // Get ResetPassword Token
    const resetToken = designer.getResetPasswordToken();
  
    await designer.save({ validateBeforeSave: false });

    //Link Sent on mail
  
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;
  
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  
    try {
      await sendEmail({
        email: designer.email,
        subject: `Graphic Designer Hub Password Recovery`,
        message,
      });
  
      res.status(200).json({
        success: true,
        message: `Email sent to ${designer.email} successfully`,
      });
    } catch (error) {
        designer.resetPasswordToken = undefined;
        designer.resetPasswordExpire = undefined;
  
      await designer.save({ validateBeforeSave: false });
  
      return next(new ErrorHandler(error.message, 500));
    }
  });


 //Reset Password
  exports.resetPassword = catchAsyncError(async (req, res, next) => {
    
    //creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");


    const designer  = await Designer.findOne({
        resetPasswordToken,
        resetPasswordExpire:{ $gt: Date.now() },
    });

    if (!designer) {
        return next(new ErrorHandler("Reset Password Token is Invalid or has been Expired",400));
    }

    if(req.body.password !== req.body.confirmPassword ) {
        return next(new ErrorHandler("Password does not match Password",400));
    }

    designer.password = req.body.password;
    designer.resetPasswordToken = undefined;
    designer.resetPasswordExpire = undefined;

    await designer.save();

    sendDToken(designer, 200, res);


  });



  // update Designer password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const designer = await Designer.findById(req.designer.id).select("+password");

  const isPasswordMatched = await designer.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  designer.password = req.body.newPassword;

  await designer.save();

  sendDToken(designer, 200, res);
});


//Get Designer Details
exports.getDesignerLDetails = catchAsyncError(async (req, res, next) => {
  const designer = await Designer.findById(req.designer.id);

  res.status(200).json({
    success: true,
    designer,
  });
});


