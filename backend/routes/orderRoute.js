const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder, updatePrice, myDOrders } = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { isAuthenticatedDesigner} = require("../middleware/designerAuth");


router.route("/order/new").post(isAuthenticatedUser, newOrder);

//single order
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);

//myorders --user
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

//myorders -- Designer
router.route("/orders").get(myDOrders);

//for all orders --ADMIN
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin","designer"),getAllOrders);

//Update Order --Admin Designer
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin","designer"),updateOrder)
                                .delete(isAuthenticatedUser, authorizeRoles("admin","designer"),deleteOrder);

router.route("/admin/order/price/:id").put(isAuthenticatedUser, authorizeRoles("admin","designer"),updatePrice)


module.exports = router;