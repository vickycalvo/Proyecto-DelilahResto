
module.exports = {
  up: (queryInterface, Sequelize) => {

    QueryInterface.createTable ('users', {  
      
      id :{
         type: Sequelize.INTEGER(15).UNSIGNED,
         allowNull: false,
         autoIncrement: true,
         unique: true,
         primaryKey: true,
   },
     username :{
         allowNull: false,
         unique: true,
         type: Sequelize.STRING(20)
   },
     name: {
         allowNull: false,
         unique: true,
         type: Sequelize.STRING(70)
     },
     address :{
         allowNull: false,
         type: Sequelize.STRING(100)
     },
     email :{
         allowNull: false,
         unique: true,
         type: Sequelize.STRING(100)
     },
     phone :{
         allowNull: false,
         type: Sequelize.INTEGER(13).UNSIGNED
     },
     type :{
         allowNull: false,
         type: Sequelize.ENUM('admin', 'user')
     },
     password: {
         allowNull: false,
         type: Sequelize.STRING(300)
     },
     createdAt: {
         allowNull: false,
         type: Sequelize.DATE
     },
     updatedAt: {
         allowNull: false,
         type: Sequelize.DATE
     }  
    })

  }}


