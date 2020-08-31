const { verify } = require("../utils/jwtservice");

const addPrivilage = (req, res, next) => {
  const payload = verify(req.cookies.jwt);
  if (payload.sub =="Admin" || payload.sub =="Manager") {
    req.jwt = payload;
    console.log(payload);
    next();
  } else {
    res.redirect("/dashboard");
  }
};

module.exports = addPrivilage;
