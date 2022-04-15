const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const designerModel = require("../models/designerModel");
const Designer = require("../models/designerModel");

exports.isAuthenticatedDesigner = catchAsyncError( async(req,res,next)=>{
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resources",401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.designer = await Designer.findById(decodedData.id);

    next();
});


exports.authorizeDRoles = (...roles) =>{
    return (req,res,next) => {

        if(!roles.includes(req.designer.role)){
            return next( new ErrorHandler(`Role: ${req.designer.role} is not allowed to access this resource`,403)
            );
        };
        next();
    };
};