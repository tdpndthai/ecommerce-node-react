const experss = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
//import
const userRoutes = require("./routes/user");

//app
const app = experss();

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  });

//routes
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listening port ${port}`);
});
