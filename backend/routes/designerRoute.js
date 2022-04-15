const express = require("express");

const { getAllDesigners,createDesigner, 
        updateDesigner, deleteDesigner,
        getDesignerDetails, createDesignerReview, 
        getDesignerReviews, deleteReview } = require("../controllers/designerController");

const { registerDesigner, loginDesigner, 
        forgotPassword, resetPassword, updatePassword, 
        getLoggedDesignerDetails,
        myDOrders,
        logout,
        getDesignerLDetails} = require("../controllers/designersController");

const { isAuthenticatedDesigner,authorizeDRoles } = require("../middleware/designerAuth");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");
const router = express.Router();

//get All Designers
router.route("/designers").get(getAllDesigners);

// //designer-url
// router.route("/designer/new").post( isAuthenticatedUser ,authorizeRoles("admin","designer") , createDesigner);

//update designer
router.route("/admin/designer/:id").put( isAuthenticatedDesigner ,authorizeDRoles("admin","designer") , updateDesigner);

router.route("/designer/:id").get(getDesignerDetails);

//review
router.route("/review").put( isAuthenticatedUser, createDesignerReview);

//get a Reviews and Delete review
router.route("/reviews").get(getDesignerReviews).delete(isAuthenticatedUser, deleteReview);



//Register Designer
router.route("/designer/register").post(registerDesigner);

//Login Designer
router.route("/designer/login").post(loginDesigner);

//Logout
router.route("/logout").get(logout);

//forgot password
router.route("/password/dforgot").post(forgotPassword);

//Reset Password
router.route("/designer/password/reset/:token").put(resetPassword);

//update user password
router.route("/designer/password/update").put(isAuthenticatedDesigner, updatePassword);

router.route("/dme").get(isAuthenticatedDesigner, getDesignerLDetails);






module.exports = router