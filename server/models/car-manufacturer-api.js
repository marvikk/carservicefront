var {connection} = require('../config/dbconnect');
var Sequelize = require("sequelize");

//cars-models api
var CarManufacturerApi = connection.define("carmanufacturerapi",{
    "id": {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    "title": Sequelize.STRING
});
CarManufacturerApi.sync().then(function(){
    console.log('Success');
}).catch(function(err){
    console.log('success error '+ err);
});

module.exports = { CarManufacturerApi };
