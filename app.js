//env file
require("dotenv").config();

//imports
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const rentalRouter = require("./routes/rental");

//create the server
const app = express();
app.use(express.json());

//mongo connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo connection established");
  })
  .catch((e) => {
    console.log("Mongo_Connection_Error: " + e);
  });

//routes
app.use("/user", userRouter);
app.use("/rentals", rentalRouter);

//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
