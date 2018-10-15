const bcrypt = require("bcryptjs");
const User = require("./models/User");

const userAdmin = new User({
  email: "admin111@gmail.com",
  password: "tests",
  role: "admin"
});

User.create(userAdmin, function(req, res) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(userAdmin.password, salt, (err, hash) => {
      if (err) {
        console.log("test" + err);
      }
      userAdmin.password = hash;
      userAdmin.save();
    });
  });
});
