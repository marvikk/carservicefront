var {connection} = require('../config/dbconnect');
var Sequelize = require("sequelize");

//model commentsTender
var CommentsTender = connection.define("commentstender", {
    "comment": Sequelize.TEXT,
    "masterName":Sequelize.STRING,
    "masterId": Sequelize.STRING,
    "date": Sequelize.DATE,
    "idTender": Sequelize.STRING
});
CommentsTender.sync().then(function(){
    console.log('Success');
}).catch(function(err){
    console.log('success error '+ err);
});

module.exports = { CommentsTender };
