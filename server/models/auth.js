var {connection} = require('../config/dbconnect');
var Sequelize = require("sequelize");

//model auth
var Auth = connection.define('authentic', {
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    role: Sequelize.STRING,
    idUser: Sequelize.STRING
});
Auth.sync().then(function(){
    console.log('Success');
}).catch(function(err){
    console.log('success error '+ err);
});

module.exports = { Auth };
