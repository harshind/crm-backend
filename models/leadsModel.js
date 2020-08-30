const { DataTypes } = require("sequelize");
const crmApp = require("../config/crmApp");
const Contact = require("../models/contacts");
const LeadStatus = require("../models/leadStatus")


const Lead = crmApp.define("Leads",{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    contactId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Contact,
            key: "id"
        }
    },
    statusId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: LeadStatus,
            key: "id"
        }
    },
    name:{
        type: DataTypes.INTEGER,
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