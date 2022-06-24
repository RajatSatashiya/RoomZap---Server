const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const user = require("../controller/user_controller");

router.post("/signup", user.signUp);
router.post("/signin", user.signIn);
router.patch("/", auth.auth, user.updateUser);

module.exports = router;
