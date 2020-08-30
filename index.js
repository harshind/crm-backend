require('dotenv').config()
require("/config/db");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const auth = require("./middleware/auth");
const passiveAuth = require("./middleware/passiveAuth");
const isEven = require("./views/helpers/isEven");
const inc = require("./views/helpers/inc");
const ifEquality = "./views/helpers/ifEquality";
const app = express();

// Creating handlebars engine
const hbs = expressHbs.create({
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "./views/layouts"),
    partialsDir: path.join(__dirname, "./views/partials"),
    helpers: {
      isEven,
      inc,
      ifEquality
    }
  });
  
  app.use("/static", express.static(path.join(__dirname, "public")));
  // Let express know to use handlebars
  app.engine(".hbs", hbs.engine);
  app.set("view engine", ".hbs");
  app.set("views", path.join(__dirname, "./views"));
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  
  app.get("/", passiveAuth, (request, response) => {
    response.status(200).render("home", {
      layout: "hero",
      title: "Home",
      isUser: request.jwt ? request.jwt.sub === "user" : false
    });
  });
  
  app.get("/signup", (request, response) => {
    response.status(200).render("signup", {
      layout: "layout1",
      title: "SignUp",
      action: "/api/friends",
      method: "POST"
    });
  });
  app.get("/login", (request, response) => {
    response.status(200).render("login.hbs", {
      layout: "layout1",
      title: "Login",
      action: "/api/friends/login",
      method: "POST"
    });
  });
  
