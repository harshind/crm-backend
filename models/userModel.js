const { DataTypes } = require("sequelize");
const crmApp = require("../config/db");


const User = crmApp.define("users",{
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
    username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue("password", hash(value));
        }
    },
    type:{
          type: DataTypes.ENUM,
          values:['Manager',"Admin","Employee","Employee-p"]
        }
    }
);



module.exports = User;