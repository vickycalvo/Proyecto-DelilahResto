const Sequelize = require('sequelize');
const sequelize = new Sequelize (`mysql://root:root@$localhost:8889/DelilahResto`); //user,password,host,port,db name

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = sequelize;
