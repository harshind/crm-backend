const { DataTypes } = require("sequelize");
const crmApp = require("../config/db");


const ServiceRequest = crmApp.define("ServiceRequest",{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true

    },
    status:{
        type: DataTypes.ENUM({
            values: ['Created', 'Open', 'InProgress','Released','Cancelled','Completed']
          }),
        allowNull:false,

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
        type: DataTypes.ENUM,
        values:["level-3", "level-2","level-1"],
        allowNull:false,
    }
})

module.exports = ServiceRequest;