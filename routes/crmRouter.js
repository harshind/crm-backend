const express = require("express")
const { compareHash } = require("../utils/hash");
const {sign, verify} = require("../utils/jwtservice")
const Contact = require("../models/contacts");
const Lead = require("../models/leadsModel")
const Service = require("../models/serviceRequest")
const User = require("../models/userModel");
const { sequelize } = require("sequelize");
const { Op } = require("sequelize");
//const { Json } = require("sequelize/types/lib/utils");

const crmRouter = express.Router();

const getServiceChartdata = async ()=>{
  const data = [];
  //'Created', 'Open', 'InProgress','Released','Cancelled','Completed'
  const created = await Service.count({
    where: {
      status: {
        [Op.eq]: "Created"
      }
    }
  });
  const Open = await Service.count({
    where: {
      status: {
        [Op.eq]: "Open"
      }
    }
  });
  const Completed = await Service.count({
    where: {
      status: {
        [Op.eq]: "Completed"
      }
    }
  });
  const Cancelled= await Service.count({
    where: {
      status: {
        [Op.eq]: "Cancelled"
      }
    }
  });
  const Released = await Service.count({
    where: {
      status: {
        [Op.eq]: "Released"
      }
    }
  });
  const InProgress = await Service.count({
    where: {
      status: {
        [Op.eq]: "InProgress"
      }
    }
  });
  data.push(created);
  data.push(Open);
  data.push(InProgress);
  data.push(Released);
  data.push(Cancelled);
  data.push(Completed);
  console.log(data);
  return data;
}

const getLeadChartdata = async ()=>{
  const data = [];
  const New = await Lead.count({
    where: {
      status: {
        [Op.eq]: "New"
      }
    }
  });
  const Contacted = await Lead.count({
    where: {
      status: {
        [Op.eq]: "Contacted"
      }
    }
  });
  const Quallified = await Lead.count({
    where: {
      status: {
        [Op.eq]: "Qualified"
      }
    }
  });
  const Lost= await Lead.count({
    where: {
      status: {
        [Op.eq]: "Lost"
      }
    }
  });
  const Cancelled = await Lead.count({
    where: {
      status: {
        [Op.eq]: "Cancelled"
      }
    }
  });
  const Completed = await Lead.count({
    where: {
      status: {
        [Op.eq]: "Confirmed"
      }
    }
  });
  data.push(parseInt(JSON.stringify(JSON.parse(New)), 10));
  data.push(parseInt(JSON.stringify(JSON.parse(Contacted)), 10));
  data.push(parseInt(JSON.stringify(JSON.parse(Quallified)), 10));
  data.push(parseInt(JSON.stringify(JSON.parse(Lost)), 10));
  data.push(parseInt(JSON.stringify(JSON.parse(Cancelled)), 10));
  data.push(parseInt(JSON.stringify(JSON.parse(Completed)), 10));
  console.log(data);
  return data;
}



const getAllcounts = async () =>{
  const data=[]
  const Ccount  = await Contact.count({})
  const Lcount = await Lead.count({})
  const Scount  = await Service.count({})
  data.push(...[Ccount,Lcount,Scount]);
  console.log(Ccount)
  return data
}
const getAllContacts = async () => {
  const result  = await Contact.findAll({
        limit: 10,
        order: [
          ['id', 'ASC'],
        ]
    });
    return JSON.parse(JSON.stringify(result));
  };
const getAllLeads = async () => {
  const result = await Lead.findAll({
      limit:10,
      order: [
        ['id', 'ASC'],
      ]
  });
  return JSON.parse(JSON.stringify(result));
};

const getAllServiceRequest = async () => {
  const result  = await Service.findAll({
        limit: 10,
        order: [
          ['id', 'ASC'],
        ]
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
    const sub = user.type;
    console.log(user)
    if (user) {
      const isValidPassword = compareHash(password, user.password);
      if (isValidPassword) {
        const token = sign({
          sub: sub,
          username,
          id: id
        });
        console.log(token)
        res.cookie("jwt", token, { httpOnly: true});
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
    getContactById,
    getAllcounts,
    getServiceChartdata,
    getLeadChartdata
  };
  