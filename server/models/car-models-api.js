var {connection} = require('../config/dbconnect');
var Sequelize = require("sequelize");

var CarModelsApi = connection.define("carmodelsapi",{
    "id": {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    "model": Sequelize.JSON(Sequelize.TEXT)
});
CarModelsApi.sync().then(function(){
    console.log('Success');
}).catch(function(err){
    console.log('success error '+ err);
});

module.exports = { CarModelsApi };
