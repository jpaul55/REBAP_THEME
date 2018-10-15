const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  title: {
    type: String
  },
  firstname: {
    type: String
  },
  middlename: {
    type: String
  },
  lastname: {
    type: String
  },
  userAvatar: {
    type: String
  },
  bankDepositPic: {
    type: String
  },
  receipt: {
    type: String
  },
  password: {
    type: String
  },
  nickname: {
    type: String
  },
  dateofbirth: {
    type: String
  },
  placeofbirth: {
    type: String
  },
  sex: {
    type: String
  },
  civilstatus: {
    type: String
  },
  email: {
    type: String
  },
  mobile1: {
    type: String
  },
  mobile2: {
    type: String
  },
  tin: {
    type: String
  },
  isvatreg: {
    type: String
  },
  prcid: {
    type: String
  },
  prcexdate: {
    type: Date,
    default: Date.now
  },
  hlurb: {
    type: String
  },
  approve: {
    type: String,
    num: ["0", "1", "2"] /* default - 0, pending - 1, approve - 2 */,
    default: "0"
  },
  approveReg: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    num: ["user", "admin"] /* default - 0, pending - 1, approve - 2 */,
    default: "user"
  }
});

module.exports = User = mongoose.model("users", UserSchema);
