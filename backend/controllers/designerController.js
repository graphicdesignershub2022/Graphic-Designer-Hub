const Designer = require("../models/designerModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");


// //Create Designer --ADMIN
// exports.createDesigner = catchAsyncError(async (req,res,next)=>{

//     const designer = await Designer.create(req.body);

//     res.status(201).json({
//         success:true,
//         designer
//     });
// });



//Get ALL DESIGNERS
exports.getAllDesigners = catchAsyncError(async(req,res)=>{

    //pagination
    const resultPerPage = 8;
    const designerCount = await Designer.countDocuments();

    const apiFeature = new ApiFeatures(Designer.find(),req.query)
      .search()
      .filter()

      let designers = await apiFeature.query;

      let filteredDesignersCount = designers.length; 
      
      apiFeature.pagination(resultPerPage);

    designers = await apiFeature.query;

    res.status(201).json({
        success:true,
        designers,
        resultPerPage,
        designerCount,
        filteredDesignersCount
    });
    
});


//Update the Designer --Admin
exports.updateDesigner = catchAsyncError(async (req,res,next)=>{

    let designer = await Designer.findById(req.params.id);

    if(!designer){
        return next(new ErrorHandler("Designer Not Found",404));
    }

    designer = await Designer.findByIdAndUpdate(req.params.id,req.body,{
        new:true,runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        designer
    });
});


//Delete Designer
exports.deleteDesigner = catchAsyncError(async(req,res,next)=>{

    const designer = await Designer.findById(req.params.id);

    if(!designer){
        return next(new ErrorHandler("Designer Not Found",404));
    }

    await designer.remove();

    res.status(200).json({
        success:true,
        message:"Designer Deleted Successfully"
    });
});


//Get Single Designer Details
exports.getDesignerDetails = catchAsyncError(async(req,res,next)=>{

    const designer = await Designer.findById(req.params.id);

    if(!designer){
        return next(new ErrorHandler("Designer Not Found",404));
    }

    res.status(200).json({
        success:true,
        designer,
        // designerCount,
    });
});



//Create New Review or Update Review 
exports.createDesignerReview =  catchAsyncError( async( req, res, next) =>{

    const { rating,comment,designerId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const designer = await Designer.findById(designerId);

    const isReviewed = designer.reviews.find(rev=> rev.user.toString() === req.user._id.toString());
    if(isReviewed){
        designer.reviews.forEach((rev) => {
            if( rev.user.toString()=== req.user._id.toString())
            (rev.rating = rating),
            (rev.comment = comment)
        });
    }
    else{
        designer.reviews.push(review);
        designer.numOfReviews = designer.reviews.length
    }

    //average of ratings ((4+5+5+2)/4)=16/4=4
    let avg=0;
    designer.reviews.forEach((rev)=>{
        avg += rev.rating;
    })
    designer.ratings = avg / designer.reviews.length;

    await designer.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })
});



// Get All Reviews of a Designer(Single)
exports.getDesignerReviews = catchAsyncError (async (req, res, next) => {
    const designer = await Designer.findById(req.query.id);
  
    if (!designer) {
      return next(new ErrorHandler("Designer not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: designer.reviews,
    });
  });



  // Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const designer = await Designer.findById(req.query.designerId);
  
    if (!designer) {
      return next(new ErrorHandler("Designer not found", 404));
    }
  
    const reviews = designer.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Designer.findByIdAndUpdate(
      req.query.designerId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });



