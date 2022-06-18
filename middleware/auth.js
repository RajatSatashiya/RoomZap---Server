const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports.auth = async (req, res, next) => {
  try {
    const Authorization = req.header("Authorization");
    const token = Authorization.replace("Bearer ", "");
    req.token = token;
    req.user = await getAuthenticatedUser(token);
    next();
  } catch (e) {
    return res
      .status(401)
      .send({ error: "User not authenticated", message: e.message });
  }
};

const getAuthenticatedUser = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded._id);
  if (!user) {
    throw new Error("User not authorized");
  }
  return user;
};

module.exports.generateAuthToken = async (id) => {
  const token = jwt.sign({ _id: id }, process.env.JWT_SECRET);
  return token;
};
