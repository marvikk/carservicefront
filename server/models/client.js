var {connection} = require('../config/dbconnect');
var Sequelize = require("sequelize");

//model client
var Client = connection.define('clients', {
    name: Sequelize.STRING,
    cars: Sequelize.ARRAY(Sequelize.TEXT),
    logo: Sequelize.STRING
});
Client.sync().then(function(){
    console.log('Success');
}).catch(function(err){
    console.log('success error '+ err);
});

module.exports = { Client };
