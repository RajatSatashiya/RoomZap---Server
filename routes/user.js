const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const user = require("../controller/user_controller");

router.post("/sign-up", user.signUp);
router.post("/sign-in", user.signIn);
router.patch("/", auth.auth, user.updateUser);

module.exports = router;
