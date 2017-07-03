var {connection} = require('../config/dbconnect');
var Sequelize = require("sequelize");

//model comments
var Comment = connection.define("comments", {
    "comment": Sequelize.TEXT,
    "userName": Sequelize.STRING,
    "userId": Sequelize.STRING,
    "date": Sequelize.DATE,
    "masterId": Sequelize.STRING,
    "masterName": Sequelize.STRING,
    "rate": Sequelize.STRING
});
Comment.sync().then(function(){
    console.log('Success');
}).catch(function(err){
    console.log('success error '+ err);
});

module.exports = { Comment };
