var {connection} = require('../config/dbconnect');
var Sequelize = require("sequelize");

//model master
var Master = connection.define('masters', {
    "companyName": Sequelize.STRING,
    "mechanics": Sequelize.BOOLEAN,
    "mounting": Sequelize.BOOLEAN,
    "carWash": Sequelize.BOOLEAN,
    "towTruck": Sequelize.BOOLEAN,
    "chosenPlace": Sequelize.JSON(Sequelize.TEXT),
    "house": Sequelize.STRING,
    "companyTelephone": Sequelize.STRING,
    "startTime": Sequelize.STRING,
    "lastTime": Sequelize.STRING,
    "managerName": Sequelize.STRING,
    "managerTelephone": Sequelize.STRING,
    "directorName": Sequelize.STRING,
    "cars": Sequelize.ARRAY(Sequelize.TEXT),
    "services": Sequelize.JSON(Sequelize.TEXT),
    "logo": Sequelize.STRING,
    "categories": Sequelize.JSON(Sequelize.TEXT),
    "rate": Sequelize.FLOAT,
    "rateAll": Sequelize.STRING,
    "amountComments": Sequelize.STRING
});
Master.sync().then(function(){
    console.log('Success');
}).catch(function(err){
    console.log('success error '+ err);
});

module.exports = { Master };
