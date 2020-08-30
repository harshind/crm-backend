const { DataTypes } = require("sequelize");
const crmApp = require("../config/crmApp");
const LeadStatus = require("../models/leadStatus")


const Contact = crmApp.define("Contact",{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,

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
      },
    phone:{
          type: DataTypes.INTEGER,
          unique: true,
          validate:{
              max:10,
              min:10
          }
        }
    }
);



module.exports = Contact;