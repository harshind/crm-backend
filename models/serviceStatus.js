/*
const { DataTypes } = require("sequelize");
const crmApp = require("../config/db");
const ServiceRequest = require("../models/serviceRequest")

const ServiceStatus = crmApp.define("ServiceStatus",{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: ServiceRequest,
          key: "id"
        }
      },
    status:{
        type: DataTypes.ENUM({
            values: ['Created', 'open', 'InProgress','Released','Cancelled','Completed']
          }),
        allowNull:false,

    }
});

module.exports = ServiceStatus;

*/