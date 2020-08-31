const { DataTypes } = require("sequelize");
const crmApp = require("../config/db");
const Contact = require("../models/contacts");
//const LeadStatus = require("../models/leadStatus")


const Lead = crmApp.define("Leads",{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true

    },
    contactId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Contact,
            key: "id"
        }
    },
    status:{
        type: DataTypes.ENUM({
            values: ['New', 'Contacted', 'Qualified','Lost','Cancelled','Confirmed']
          }),
        allowNull:false,

    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    closeDate:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    amount:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
})

module.exports = Lead;