const { DataTypes } = require("sequelize");
const crmApp = require("../config/crmApp");
const serviceStatus = require("../models/serviceStatus")


const ServiceRequest = crmApp.define("ServiceRequest",{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    statusId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: serviceStatus,
            key: "id"
        }
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    dueDate:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    type:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: Tasks,
            key: 'id'
        }
    }
})

module.exports = ServiceRequest;