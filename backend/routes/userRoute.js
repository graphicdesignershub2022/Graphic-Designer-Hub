const express = require("express");
const { deleteDesigner } = require("../controllers/designerController");
const { 
    registerUser, 
    loginUser, 
    logout, 
    forgotPassword, 
    resetPassword, 
    getUserDetails, 
    updatePassword, 
    updateProfile, 
    getAllUser, 
    getSingleUser,
    updateUserRole,
    deleteUser} 
    = require("../controllers/userController");

const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

//Register
router.route("/register").post(registerUser);

//Login
router.route("/user/login").post(loginUser);

//Logout
router.route("/user/logout").get(logout);

//forgot password
router.route("/password/forgot").post(forgotPassword);

//Reset Password
router.route("/user/password/reset/:token").put(resetPassword);

//GetUserDetails
router.route("/me").get(isAuthenticatedUser, getUserDetails);

//update user password
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

//update Profile
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

//admin(getAll Users)
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"),getAllUser);

router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
                               .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
                               .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

//Delete Designer Admin Power
router.route("/admin/designer/:id").delete( isAuthenticatedUser ,authorizeRoles("admin") , deleteDesigner);

module.exports = router;