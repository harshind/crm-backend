const port = 3000;
//const hostname = '127.0.0.1'

require('dotenv').config()
require("./config/db");
const express = require("express");
const expressHbs = require("express-handlebars")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const auth = require("./middleware/auth");
const passiveAuth = require("./middleware/passiveAuth");
const addPrivilage = require("./middleware/addPrivilage");
const isEven = require("./views/helpers/isEven");
const inc = require("./views/helpers/inc");
const ifEquality = require("./views/helpers/ifEquality");
const app = express();
const {crmRouter, getLeadById, getSrById, getContactById, getAllContacts,getAllLeads, getAllServiceRequest} = require("./routes/crmRouter");
const { hostname } = require('os');

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
      });
  });
  
  app.get("/dashboard", passiveAuth, (request, response) => {
    const leads = getAllLeads();
    const sr = getAllServiceRequest();
    const contacts = getAllContacts();
    response.status(200).render("home", {
      layout: "hero",
      title: "DashBoard",
      isEmployee: request.jwt ? request.jwt.sub === "Employee" : false,
      isAdmin: request.jwt ? request.jwt.sub === "Admin" : false,
      isManager: request.jwt ? request.jwt.sub === "Manager" : false,
      isEmployeeP : request.jwt ? request.jwt.sub === "Employee-P" : false,
    });
  });
  
  app.get("/signup",addPrivilage, (request, response) => {
    response.status(200).render("signup", {
      layout: "layout1",
      title: "SignUp",
      action: "/api/crm",
      method: "POST"
    });
  });
  app.get("/login",passiveAuth, (request, response) => {
    response.status(200).render("login.hbs", {
      layout: "layout1",
      title: "Login",
      action: "/api/crm/login",
      method: "POST"
    });
  });
  app.get("/servicerequest",passiveAuth, (request, response) => {
    response.status(200).render("servicerequest.hbs", {
      layout: "layout1",
      title: "Service Request",
      action: "/api/crm/sr",
      method: "POST"
    });
  });
  app.get("/update-sr/:id",passiveAuth, async (request, response) => {
    const {id} = request.params;
    const requiredSr = await getSrById(id);
    if(requiredSr){
      response.status(200).render("servicerequest.hbs", {
        layout: "layout1",
        title: "Service Request",
        sr: requiredSr,
        action: "/api/crm/sr/"+ id,
        method: "PUT"
      });
    }else{
      res.status(404).send("Lead not found");
    }
    
  });
  app.get("/leads",passiveAuth, (request, response) => {
    response.status(200).render("leads.hbs", {
      layout: "layout1",
      title: "Login",
      action: "/api/crm/leads",
      method: "POST"
    });
  });
  app.get("/update-leads/:id", async (request, response) => {
    const {id} = request.params;
    const requiredlead = await getLeadById(parseInt(id));
    const requiredContact = await getContactById(requiredlead.contactId);
    if(requiredlead){
      response.status(200).render("leads.hbs", {
        layout: "layout1",
        title: "Login",
        contact: requiredContact,
        action: "/api/crm/leads/"+id,
        method: "PUT",
        lead: requiredlead
      });
    }else{
      res.status(404).send("Lead not found");
    }
   
  });
  app.get("/update-contact/:id", async (request, response) => {
    const {id} = request.params;
    const requiredContact = await getContactById(id)
    if(requiredContact){
      response.status(200).render("contact.hbs", {
        layout: "layout1",
        title: "Update Contact",
        contact: requiredContact,
        action: "/api/crm/update-contact/"+id,
        method: "PUT"
      });
    }else{
      res.status(404).send("Contact not found");
    }
    
  });
  app.use("/api/crm", crmRouter);

  app.get("/about", (req, res) => {
    res.status(200).render("about", {
      layout: "hero"
    });
  });

  app.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/");
  });

  app.get("*", (req, res) => {
    res.status(404).send("404 Page not found");
  });

  app.listen(port, () => {
    console.log("server running");
  });

