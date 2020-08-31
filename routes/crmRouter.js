const express = require("express")
const { compareHash } = require("../utils/hash");
const {sign, verify} = require("../utils/jwtservice")
const Contact = require("../models/contacts");
const Lead = require("../models/leadsModel")
const Service = require("../models/serviceRequest")
const User = require("../models/userModel")

const crmRouter = express.Router();

const getAllContacts = async () => {
    const result = await Contact.findAll({
        limit: 10
    });
    return JSON.parse(JSON.stringify(result));
  };
const getAllLeads = async () => {
  const result = await Lead.findAll({
      limit:10
  });
  return JSON.parse(JSON.stringify(result));
};

const getAllServiceRequest = async () => {
    const result = await Service.findAll({
        limit: 10
    });
    return JSON.parse(JSON.stringify(result));
  };

const getLeadById = async id => {
    const result = await Lead.findByPk(id);
    // TODO: Find a better way to get plain json
    return JSON.parse(JSON.stringify(result));
  };
  
  const getSrById = async id => {
    const result = await Service.findByPk(id);
    // TODO: Find a better way to get plain json
    return JSON.parse(JSON.stringify(result));
  };
  
  const getContactById = async id => {
    const result = await Contact.findByPk(id);
    // TODO: Find a better way to get plain json
    return JSON.parse(JSON.stringify(result));
  };
  


crmRouter
  .post("/login", async (req, res) => {
    const { username, password } = req.body;
    const result = await User.findOne({
      where: {
        username: username
      }
    });
    const user = result.get();
    const id = user.id;
    if (user) {
      const isValidPassword = compareHash(password, user.password);
      if (isValidPassword) {
        const token = sign({
          sub: user.Type,
          username,
          id: id
        });
        res.cookie("jwt", token, { httpOnly: true });
        res.status(200).redirect("/dashboard");
      } else {
        res.status(401).send("Invalid User");
      }
    } else {
      res.status(401).send("Invalid User");
    }
  })
  .post("/", async (req, res) => {
    try {
      if (req.body.username) {
        const result = await User.create(req.body);
        res.status(200).redirect("/dashboard");
      } else {
        res.status(400).send("Invalid User");
      }
    } catch (e) {
      res.status(500).send("Internal Server Error");
    }
  })
  .post("/leads", async (req, res) => {
    try {
      const {firstName, lastName, email,phone, ...lead} =  req.body;
      if (req.body.name) {
        const contact =  await Contact.create({
          firstName: firstName,
          lastName:lastName,
          email:email,
          phone: phone
        })
        const result = await Lead.create(lead);
        res.status(200).redirect("/dashboard");
      } else {
        res.status(400).send("Invalid User");
      }
    } catch (e) {
      res.status(500).send("Internal Server Error");
    }
  })
  .put("/leads/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Lead.update(req.body, {
          where: {
            id
          }
        });
        if (result.length) {
          res.status(200).json({ message: "Lead Updated Updated!" });
        } else {
          res.status(400).send("lead unavailable");
        }
      } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error");
      }
  })
  .post("/sr", async (req, res) => {
    try {
      if (req.body.username) {
        const result = await Service.create(req.body);
        res.status(200).redirect("/dashboard");
      } else {
        res.status(400).send("Invalid Request");
      }
    } catch (e) {
      res.status(500).send("Internal Server Error");
    }
  })
  .put("sr/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Service.update(req.body, {
          where: {
            id
          }
        });
        if (result.length) {
          res.status(200).json({ message: "Service Request Updated!" });
        } else {
          res.status(400).send("Service Request unavailable");
        }
      } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error");
      }
  })
  .put("update-contact/:id", async (req, res) => {
    try {
      if (req.body.username) {
        const result = await Contact.update(req.body,{
            where: {
                id
            }
        });
        res.status(200).redirect("/dashboard");
      } else {
        res.status(400).send("Invalid User");
      }
    } catch (e) {
      res.status(500).send("Internal Server Error");
    }
  });
  

  module.exports = {
    crmRouter,
    getAllContacts,
    getAllLeads,
    getAllServiceRequest,
    getLeadById,
    getSrById,
    getContactById
  };
  