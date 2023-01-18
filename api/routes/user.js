const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const UserControllers = require('../controllers/user')


// GET method to get all users till created
router.get("/", UserControllers.user_get_all_users);

// POST method to create USER
router.post("/signup",checkAuth, UserControllers.user_create_user);

// POST method for user login
router.post("/login", checkAuth,UserControllers.user_login_user);

// Delete method to delete user
router.delete("/:userId",checkAuth, UserControllers.user_delete_user);

module.exports = router;
