module.exports = {
  mongoURI: "mongodb://Paul:pogiako55@ds259109.mlab.com:59109/real_state",
  secretOrKey: "secret"
};
if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_prod");
} else {
  module.exports = require("./keys_dev");
}
