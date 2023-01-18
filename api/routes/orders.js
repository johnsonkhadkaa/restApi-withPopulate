const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const OrdersController = require('../controllers/orders')

// GET method to fetch ORDERS
router.get("/", checkAuth,OrdersController.orders_get_all_order);

// POST Method for orders creation
router.post("/", checkAuth, OrdersController.orders_create_oder);

// GET method to find individual order
router.get("/:orderId",checkAuth, OrdersController.orders_get_order);

// DELETE method to delete the selcted order
router.delete("/:orderId",checkAuth, OrdersController.orders_delete_oder);

module.exports = router;
