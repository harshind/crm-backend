
const { Sequelize } = require("sequelize");
const path = require("path");
//const hostname = '127.0.0.1'

require('dotenv').config({
  path:path.join(__dirname,"../.env"),
})
const crmApp = new Sequelize(process.env.DB_URL,{
  dialect:'postgres'
});

(async () => {
  try {
    await crmApp.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = crmApp;
