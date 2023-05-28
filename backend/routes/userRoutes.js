const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require('../controllers/userController')
// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

router.patch('/updateuser/:id', userController.updateUser)
// user DB

router.get('/userinfo/:id', userController.userInfo)

// crm

// invoices

// proposal - quotation


// projects


// tasks



module.exports = router;