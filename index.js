
const path = require("path");
//const hostname = '127.0.0.1'

require('dotenv').config({
  path:path.join(__dirname,"./.env"),
})
const express = require("express");
const expressHbs = require("express-handlebars")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
const passiveAuth = require("./middleware/passiveAuth");
const addPrivilage = require("./middleware/addPrivilage");
const isEven = require("./views/helpers/isEven");
const inc = require("./views/helpers/inc");
const ifEquality = require("./views/helpers/ifEquality");
const app = express();
const {crmRouter,getLeadChartdata,getAllcounts,getServiceChartdata, getLeadById, getSrById, getContactById, getAllContacts,getAllLeads, getAllServiceRequest} = require("./routes/crmRouter");
const cors = require("cors")


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
  //app.use( express.static(path.join(__dirname, "public")))
  // Let express know to use handlebars
  app.engine(".hbs", hbs.engine);
  app.set("view engine", ".hbs");
  app.set("views", path.join(__dirname, "./views"));
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors())

  app.get("/", passiveAuth, (request, response) => {
    response.status(200).render("home", {
      layout: "hero",
      title: "Home",
      });
  });
  
  app.get("/dashboard", passiveAuth, async (request, response) => {
    try{
      const sr = await getServiceChartdata();
      const ld = await getLeadChartdata();
      response.status(200).render("dashboard", {
        layout: "dashboardlayout",
        title: "DashBoard",
        sr :sr,
        ld:ld,
        isEmployee: request.jwt ? request.jwt.sub === "Employee" : false,
        isAdmin: request.jwt ? request.jwt.sub === "Admin" : false,
        isManager: request.jwt ? request.jwt.sub === "Manager" : false,
        isEmployeeP : request.jwt ? request.jwt.sub === "Employee-P" : false,
      });
    }catch(e){
      response.send(e)
    }
  })
  app.get("/service-request",passiveAuth, async (request, response) => {
    try{
    const sr = await getAllServiceRequest();
    
    const [Ccount, Lcount, Scount] = await getAllcounts();
    response.status(200).render("serviceRequest", {
      layout: "dashboardlayout",
      title: "Service Request",
      sr :sr,
      Ccount:Ccount,
      Lcount:Lcount,
      Scount:Scount,
      isEmployee: request.jwt ? request.jwt.sub === "Employee" : false,
        isAdmin: request.jwt ? request.jwt.sub === "Admin" : false,
        isManager: request.jwt ? request.jwt.sub === "Manager" : false,
        isEmployeeP : request.jwt ? request.jwt.sub === "Employee-P" : false,
      });
    }catch(e){
      response.send("error")
    }
  })
  app.get("/lead-request",passiveAuth, async (request, response) => {
    try{
      const lead = await getAllLeads();
      const [Ccount, Lcount, Scount] = await getAllcounts();
    response.status(200).render("leadRequest", {
      layout: "dashboardlayout",
      title: "Lead",
      lead :lead,
      Ccount:Ccount,
      Lcount:Lcount,
      Scount:Scount,
      isEmployee: request.jwt ? request.jwt.sub === "Employee" : false,
        isAdmin: request.jwt ? request.jwt.sub === "Admin" : false,
        isManager: request.jwt ? request.jwt.sub === "Manager" : false,
        isEmployeeP : request.jwt ? request.jwt.sub === "Employee-P" : false,
      });
    }catch(e){
      response.send("error")
    }
  })
  app.get("/contact",passiveAuth, async (request, response) => {
    try{
      const contact = await getAllContacts();
      const [Ccount, Lcount, Scount] = await getAllcounts();
    response.status(200).render("contact", {
      layout: "dashboardlayout",
      title: "Contact",
      contact :contact,
      Ccount:Ccount,
      Lcount:Lcount,
      Scount:Scount,
      isEmployee: request.jwt ? request.jwt.sub === "Employee" : false,
        isAdmin: request.jwt ? request.jwt.sub === "Admin" : false,
        isManager: request.jwt ? request.jwt.sub === "Manager" : false,
        isEmployeeP : request.jwt ? request.jwt.sub === "Employee-P" : false,
      });
    }catch(e){
      response.send("error")
    }
  })
  app.get("/signup", (request, response) => {
    response.status(200).render("signUp", {
      layout: "layout1",
      title: "SignUp",
      action: "/api/crm/",
      method: "POST"
    });
  });
  app.get("/login", (request, response) => {
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
      method: "POST",
      btnName: "generate"
    });
  });
  app.get("/update-sr/:id",passiveAuth, async (request, response) => {
    const {id} = request.params;
    const requiredSr = await getSrById(id);
    if(requiredSr){
      response.status(200).render("servicerequest.hbs", {
        layout: "layout2",
        title: "Service Request",
        sr: requiredSr,
        btnName: "Update",
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
      title: "Leads",
      action: "/api/crm/leads",
      method: "POST",
      btnName: "generate"
    });
  });
  app.get("/update-leads/:id", async (request, response) => {
    const {id} = request.params;
    const requiredlead = await getLeadById(parseInt(id));
    const requiredContact = await getContactById(requiredlead.contactId);
    if(requiredlead){
      response.status(200).render("leads.hbs", {
        layout: "layout2",
        title: "Leads",
        contact: requiredContact,
        btnName: "Update",
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
  app.listen(8090, () => {
    console.log("server running");
  });