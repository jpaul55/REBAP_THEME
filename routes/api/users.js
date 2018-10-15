const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const fs = require("fs-extra");
const nodemailer = require("nodemailer");
const xoauth2 = require("xoauth2");
const smtpTransport = require("nodemailer-smtp-transport");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const uuidv4 = require("uuid/v4");
const path = require("path");
const url = require("url");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    //originalname is the uploaded file's name with extn
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, newFilename);
  }
});

const upload = multer({ storage: storage });

//upload.single('userAvatar'),

// let storage = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, callback) => {
//       let type = req.params.type;
//       let path = `./uploads/${type}`;
//       fs.mkdirsSync(path);
//       callback(null, path);
//     },
//     filename: (req, file, callback) => {
//       //originalname is the uploaded file's name with extn
//       callback(null, file.originalname);
//     }
//   })
// });

const User = require("../../models/User");

// let transporter = nodemailer.createTransport(
//   smtpTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     auth: {
//       user: "ampol551@gmail.com",
//       pass: "Ampolpogi1982c55"
//     }
//   })
// );

let transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    // host: "smtp.gmail.com",
    auth: {
      user: "ampol551@gmail.com",
      pass: "Ampolpogi1982c55"
    }
  })
);

router.post("/register", (req, res) => {
  //const { errors, isValid } = validateRegisterInput(req.file);

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      console.log(user);
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      }
      // if (!req.file || !req.file.path) {
      //   errors.receipt = 'Please upload an image copy of the receipt of REBAP Membership';
      //   return res.json(errors);
      // }
      else {
        const newUser = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          //placeofbirth: req.body.placeofbirth,
          // dateofbirth: req.body.dateofbirth,
          //mobile1: req.body.mobile1,
          //mobile2: req.body.mobile2,
          // tin: req.body.tin,
          // isvatreg: req.body.isvatreg,
          //hlurb: req.body.hlurb,
          //title: req.body.title,
          email: req.body.email,
          password: req.body.password,
          prcid: req.body.prcid
          //  receipt: req.file.path
          //userAvatar: req.file.path
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              console.log("test" + err);
            }
            newUser.password = hash;

            const emailPayload = {
              id: newUser.id,
              email: newUser.email
            };

            newUser
              .save()
              .then(function(user) {
                res.json(user);
                jwt.sign(
                  emailPayload,
                  keys.secretOrKey,
                  { expiresIn: 3600 },
                  (err, emailToken) => {
                    // var urlToSend = url.format({
                    //   protocol: process.env.PROTOCOL || "http",
                    //   host: process.env.HOST || "localhost:5000",
                    //   pathname: "confirmation/" + emailToken
                    // });
                    //  console.log(urlToSend);
                    const url =
                      keys.protocol + keys.host + "/confirmation/" + emailToken;
                    //  "/confirmation/" + emailToken;
                    console.log(url);

                    transporter.sendMail({
                      from: '"REBAP Membership"<ampol551@gmail.com>', // sender address
                      to: newUser.email,
                      subject: "Confirm Email",
                      html: `Please clickssss this email to confirm your email: <a href="${url}">${url}</a>`
                      // Preview only available when sending through an Ethereal account
                    });
                  }
                );
              })
              .catch(err => console.log("dsfsdfsdfsdfsdfdsfdsf"));

            // const rand = Math.floor(Math.random() * 9000000000) + 1000000000;
            // const host = req.get("host");
            // const link = "http://" + req.get("host") + "/verify?id=" + rand;
            // const customUrl = "https://rebap.herokuapp.com/login?id=" + rand;
            // var customUrl1 = "localhost:3000/login?id=" + rand;
            // let mailOptions = {
            //   from: '"REBAP Membership"<ampol551@gmail.com>', // sender address
            //   to: req.body.email, // list of receivers
            //   subject: "Please confirm your registration to REBAP", // Subject line
            //   text: "Thank you for signing up", // plain text body
            //   html:
            //     "<h2>Thank you for registering in REBAP. Click the link to activate below.</h2><br> <a href=" +
            //     customUrl +
            //     ">Click here to verify</a>"
            // };

            // transporter.sendMail(mailOptions, (error, info) => {
            //   if (error) {
            //     return console.log(error);
            //   }
            //   console.log("Message sent: %s", info.messageId);
            //   // Preview only available when sending through an Ethereal account
            //   console.log(
            //     "Preview URL: %s",
            //     nodemailer.getTestMessageUrl(info)
            //   );
            // });
          });
        });
      }
    })
    .catch(err => console.log("test" + err));
});

//APPROVE USERS IF PASSED
router.put("/approve/:id", (req, res, next) => {
  let listData = req.body; // listData.list, listData.property, listData.year
  let id = req.params.id;
  console.log(req.params.id);
  User.findOne({ email: req.body.email }, (err, config) => {
    if (err) return next(err);
    // Be careful if config.lists[list] or config.lists[list][property] can be undefined
    config.approve = "1";
    // this might be needed
    // config.markModified('lists.' + list + '.' + property);
    config.save(err => {
      if (err) return next(err);
      console.log(req.body.email);
      res.json({ data: config });

      // create reusable transporter object using the default SMTP transport
      // let transporter = nodemailer.createTransport(
      //   smtpTransport({
      //     service: "gmail",
      //     host: "smtp.gmail.com",
      //     auth: {
      //       user: "ampol551@gmail.com",
      //       pass: "Ampolpogi1982c55"
      //     }
      //   })
      // );

      // let mailOptions = {
      //   from: '"Fred Foo 👻"<ampol551@gmail.com>', // sender address
      //   to: req.body.email, // list of receivers
      //   subject: "Hello ✔", // Subject line
      //   text: "Hello world?", // plain text body
      //   html: "<b>Hello world!!!!!!!!!?</b>" // html body
      // };

      // transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     return console.log(error);
      //   }
      //   console.log("Message sent: %s", info.messageId);
      //   // Preview only available when sending through an Ethereal account
      //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      //   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      // });
    });
  });
});

router.get("/confirmation/:token", (req, res, next) => {
  console.log("shit");
  jwt.verify(req.params.token, keys.secretOrKey, function(err, decoded) {
    console.log(decoded.email); // bar
    User.findOne({ email: decoded.email }, (err, config) => {
      config.approveReg = true;
      config.save(err => {
        if (err) return next(err);
        // res.json({ data: config });
      });
      //  config.approveReg = true;
    });
  });
  return res.json({ registered: true });
});

//LOGIN USERS
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const approve = req.body.approve;

  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Matched
        const payload = {
          id: user.id,
          email: user.email
        };
        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );

        if (user.approveReg === false && user) {
          errors.approve = "Please confirm your email to login";
          return res.status(404).json(errors);
        }
      } else {
        errors.password = "Password incorrect";
        return res.status(404).json(errors);
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

//List all users with that has not yet been approved
//Click user then goes to specific user with handle route
//approve user or else delete user
//if approve then send to homepage for login
//login validation if credentials are passed but not approve is 0 not login yet

module.exports = router;
