const jwt = require("jsonwebtoken");
const path = require("path");

require('dotenv').config({
  path:path.join(__dirname,"../.env"),
})
const sign = (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "3 hours"
  });
};

const verify = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_KEY);
  } catch (e) {
    console.error(e);
    return false;
  }
};

exports.sign = sign;
exports.verify = verify;
