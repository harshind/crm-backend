const { verify } = require("../utils/jwtservice");

const auth = (req, res, next) => {
  const payload = verify(req.cookies.jwt);
  if (payload) {
    req.jwt = payload;
    console.log(payload);
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = auth;
