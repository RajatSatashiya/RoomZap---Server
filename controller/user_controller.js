const bcrypt = require("bcryptjs");
const User = require("../models/user");
const auth = require("../middleware/auth");
const mailUtils = require("../utils/mailUtil");
const otpGenerator = require("otp-generator");

module.exports.signUp = async (req, res) => {
  try {
    const user = User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const token = await auth.generateAuthToken(user._id);
    user.token = token;
    await user.save();
    return res.status(201).json({ status: "success", message: user });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: "failure", message: e });
  }
};

module.exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    var isMatch = await bcrypt.compare(password, user.password);

    if (isMatch && user) {
      const token = await auth.generateAuthToken(user._id);
      user.token = token;
      user.save();
      return res.status(201).json({ status: "Success", message: user });
    }
    return res
      .status(201)
      .json({ status: "failure", message: "Please check user credentials" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: "failure", message: e });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, req.body);
    return res.status(201).json({ status: "Success" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: "failure", message: e });
  }
};

module.exports.getDetails = async (req, res) => {
  try {
    return res.status(201).json({ status: "Success", message: req.user });
  } catch (e) {
    return res.status(400).json({ status: "failure", message: e });
  }
};

module.exports.getOTP = async (req, res) => {
  try {
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
      alphabets: false,
    });
    mailUtils.sendOTP(req.user.email, otp);
    return res.status(201).json({ status: "Success", message: otp });
  } catch (e) {
    return res.status(400).json({ status: "failure", message: e });
  }
};
