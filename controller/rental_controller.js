const Rental = require("../models/rental");
const User = require("../models/user");

module.exports.getAllRentals = async (req, res) => {
  try {
    const rental = await Rental.find({});
    return res.status(201).json({ status: "success", message: rental });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: "failure", message: e });
  }
};

module.exports.createRentals = async (req, res) => {
  try {
    var { apartmentNumber, city, country, street, state, postcode } = req.body;
    var location = {
      apartmentNumber,
      city,
      country,
      street,
      state,
      postcode,
    };
    const rental = Rental(req.body);
    rental.location = location;
    rental.owner = req.user._id;
    await rental.save();
    await User.findByIdAndUpdate(req.body.id, {
      $push: {
        rentals: rental._id,
      },
    });
    return res.status(201).json({ status: "success", message: rental });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: "failure", message: e });
  }
};

module.exports.updateRentals = async (req, res) => {
  try {
    await Rental.findByIdAndUpdate(req.body.id, req.body);
    return res.status(201).json({ status: "success" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: "failure", message: e });
  }
};
