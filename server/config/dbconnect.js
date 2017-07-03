var Sequelize = require("sequelize");

var connection;
if(!process.env.DATABASE_URL){
connection = new Sequelize('carservice2', 'postgres', 'password',//db-name, owner in db, password in db
    {
        host: 'localhost',
        dialect: 'postgres'
        //logging: true
    });
    }
//DATABASE_URL: postgresql-tetrahedral-32355
else if(process.env.DATABASE_URL){
var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
connection = new Sequelize(match[5], match[1], match[2], {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     match[4],
    host:     match[3],
    logging: false,
    dialectOptions: {
        ssl: true
    }
});
}
//connection.authenticate().then(function(){
//    console.log('connect to db');
//}).catch(function(err){
//    console.log('connection error '+ err);
//});

module.exports = {
  connection
}
