const { DataTypes } = require("sequelize");
const crmApp = require("../config/crmApp");


const User = crmApp.define("users",{
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
    username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
    Type:{
          type: DataTypes.ENUM,
          values:['Manager',"Admin","Employee","Employee-p"]
        }
    }
);



module.exports = User;