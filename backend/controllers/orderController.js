const Order = require("../models/orderModel");
const Designer = require("../models/designerModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeaturess = require("../utils/apifeatures");

//Create New Order
exports.newOrder = catchAsyncError( async(req,res,next )=>{

    const { orderKey,companyName, orderType,orderDescription, orderStatus,  } = req.body;

    const order = await Order.create({
        orderKey,companyName, orderType,orderDescription, orderStatus, 
        orderDate: Date.now(),
        user:req.user._id,
    });

    res.status(200).json({
        success: true,
        order,
    });
});


//Get Single Order
exports.getSingleOrder = catchAsyncError( async(req,res,next )=>{

    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next (new ErrorHandler("Order not found with this Id",404));
    }

    res.status(200).json({
        success:true,
        order,
    });
});


//Get Logged in  User Orders
exports.myOrders = catchAsyncError( async(req,res,next )=>{

    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success:true,
        orders,
    });
});

//Get Logged in  Designer Orders
exports.myDOrders = catchAsyncError( async(req,res)=>{

  const apiFeature = new ApiFeaturess(Order.find(),req.query).search().filter();
  const orders = await apiFeature.query;

  res.status(201).json({
    success: true,
    orders
  })

});



//Get all Orders -- Admin
exports.getAllOrders = catchAsyncError( async(req,res,next )=>{

    const orders = await Order.find();

    // let totalAmount = 0;

    // orders.forEach(order=>{
    //     totalAmount+=order.totalPrice;
    // })

    res.status(200).json({
        success:true,
        orders,
    });
});


// update Order Status -- Admin,designer
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Accepted") {
    return next(new ErrorHandler("You have already Accepted this order", 400));
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Accepted") {
    order.acceptedAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    order
  });
});



// delete Order -- Admin,designer
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    await order.remove();
  
    res.status(200).json({
      success: true,
    });
  });


  //update Price after accepting
  exports.updatePrice = catchAsyncError(async (req,res,next) => {
   
    const newOrderData= {
      totalPrice: req.body.totalPrice
    };

    const order= await Order.findByIdAndUpdate(req.params.id,newOrderData,{
      new : true,
      runValidators : true,
      useFindAndModify: false});
  
      if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
      }
      

      res.status(200).json({
        success:true,
      })

});
  
     
