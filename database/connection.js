const Sequelize = require('sequelize');
const data = require('../database/dataConnection')

sequelize = new Sequelize(data.dbName, data.user, data.password, {
  dialect: data.dialect,
  host: data.host,
  port: data.port
});

//reviso conección
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = sequelize;
