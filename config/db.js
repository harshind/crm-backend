const { Sequelize } = require("sequelize");
require('dotenv').config()
const crmApp = new Sequelize(process.env.DB_URL,{
  host:'localhost',
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
