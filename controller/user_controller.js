const bcrypt = require("bcryptjs");
const User = require("../models/user");
const auth = require("../middleware/auth");

module.exports.signUp = async (req, res) => {
  try {
    console.log("i was called");
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
    await User.findByIdAndUpdate(req.body.id, req.body);
    return res.status(201).json({ status: "success" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: "failure", message: e });
  }
};
