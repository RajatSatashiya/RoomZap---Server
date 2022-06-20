const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const user = require("../controller/user_controller");

router.get("/", (req, res) => {
  var value = "jethlal";
  var age = 56;
  res.status(201).send({ value, age });
});
router.post("/signup", user.signUp);
router.post("/signin", user.signIn);
router.patch("/", auth.auth, user.updateUser);

module.exports = router;
