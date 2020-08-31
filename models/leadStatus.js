
/*
const { DataTypes } = require("sequelize");
const crmApp = require("../config/db");
const Lead = require("../models/leadsModel")

const LeadStatus = crmApp.define("LeadStatus",{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Lead,
          key: "id"
        }
      },
    status:{
        type: DataTypes.ENUM({
            values: ['New', 'Contacted', 'Qualified','Lost','Cancelled','Confirmed']
          }),
        allowNull:false,

    }
});

module.exports = LeadStatus;

*/