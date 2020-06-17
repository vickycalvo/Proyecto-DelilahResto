const Sequelize = require('sequelize');


sequelize = new Sequelize('DelilahResto', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
  port: 8889
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
