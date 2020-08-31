const { DataTypes } = require("sequelize");
const crmApp = require("../config/db");
const { hash } = require("../utils/hash");
//const LeadStatus = require("../models/leadStatus")


const Contact = crmApp.define("Contact",{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true

    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "first_name"
      },
    lastName: {
        type: DataTypes.STRING,
        field: "last_name"
      },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      }
    });



module.exports = Contact;