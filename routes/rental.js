const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const rental = require("../controller/rental_controller");

router.get("/", rental.getAllRentals);
router.post("/", auth.auth, rental.createRentals);
router.patch("/", auth.auth, rental.updateRentals);

module.exports = router;
