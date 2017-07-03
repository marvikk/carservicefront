var {connection} = require('../config/dbconnect');
var Sequelize = require("sequelize");

//model tenders
var Tender = connection.define("tenders", {
    "idUser": Sequelize.STRING,
    "userName": Sequelize.STRING,
    "chosenPlace": Sequelize.JSON(Sequelize.TEXT),
    "bicycle": Sequelize.BOOLEAN,
    "passCar": Sequelize.BOOLEAN,
    "lorry": Sequelize.BOOLEAN,
    "bus": Sequelize.BOOLEAN,
    "moped": Sequelize.BOOLEAN,
    "car": Sequelize.STRING,
    "service": Sequelize.JSON(Sequelize.TEXT),
    "sum": Sequelize.STRING,
    "date": Sequelize.DATE,
    "comment": Sequelize.STRING
});
Tender.sync().then(function(){
    console.log('Success');
}).catch(function(err){
    console.log('success error '+ err);
});

module.exports = { Tender };
