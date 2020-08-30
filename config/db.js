const { Sequelize } = require("sequelize");

const crmApp = new Sequelize(process.env.DB_URL);

(async () => {
  try {
    await crmApp.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = crmApp;
