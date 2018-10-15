const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const keys = require("./config/keys");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const app = express();
const url = require("url");

//DB Config
const db = require("./config/keys").mongoURI;

//routes
const users = require("./routes/api/users");
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//const isAdmin = require("./seed.js");

app.use(passport.initialize());

//Passport Config

require("./config/passport")(passport);

// app.get("/", function(req, res) {
//   return res.redirect("http://localhost:3000");
// });

//Use routes
app.use("/api/users", users);

//Server static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.get("/confirmation/:token", (req, res) => {
  //console.log(req.params.token);

  // Just for example:
  const PROTOCOL = keys.protocol;
  const HOST = keys.host;

  jwt.verify(req.params.token, keys.secretOrKey, function(err, decoded) {
    console.log("myconsole log"); // bar
    User.findOne({ email: decoded.email }, (err, config) => {
      console.log(config.approveReg);
      if (config.approveReg === false) config.approveReg = true;
      config.save(err => {
        if (err) return next(err);
        // res.json({ data: config });
      });
      //  config.approveReg = true;
    });
  });

  return res.redirect(PROTOCOL + keys.dev);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
