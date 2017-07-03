var express = require("express");
var bodyParser = require("body-parser");
var pg = require("pg");
var Sequelize = require("sequelize");
var Restful = require('new-sequelize-restful');
var cors = require('cors');

var {connection} = require('./config/dbconnect');

var app = express();

var { Auth } = require('./models/auth');
var { Client } = require('./models/client');
var { Master } = require('./models/master');
var { Comment } = require('./models/comment');
var { Tender } = require('./models/tender');
var { CommentsTender } = require('./models/comments-tender');
var { CarManufacturerApi } = require('./models/car-manufacturer-api');
var { CarModelsApi } = require('./models/car-models-api');

var { transporter, sendMail } = require('./mailer/mailer')

app.use('/', express.static(__dirname+'/../app'));
console.log(__dirname+'../app');
app.use(bodyParser.json());
app.use(cors());
app.all(/\/api\//, (new Restful(connection)).route());

app.post('/sendmessages', function(req, res){
    var email = req.body.email;
    var pass = req.body.pass;
    sendMail(email, pass);
});

app.post('/getcomments', function(req, res){
    //console.log(req.body.id);
    Comment.findAll({where: {
        masterId: req.body.id
    }}).then(function(comment){
        res.json(comment);
    })
});

app.post('/commentstenders', function(req,res){
    CommentsTender.findAll({where: {
        idTender: req.body.id
    }}).then(function(comment){
        res.json(comment);
    })
});

app.post('/getclientbyid', function(req, res){
    Auth.findAll({where: {
        idUser: req.body.id,
        role: req.body.role
    }}).then(function(result){
        res.json(result);
        console.log(result)
    })

});

app.post('/getmechanicsbyall', function(req, res){
    var car = req.body.cars;
    var address = req.body.chosenPlace;
    var category = req.body.categories;
    Master.findAll({where: {
        cars: {$contains :car},
        services: req.body.services,
        "chosenPlace.FormattedAddress": {$like :"%" + address.FormattedAddress},
        "categories": {
            [category]: "true"
        },
        mechanics: req.body.mechanics
    }}).then(function(result){
        res.json(result);
    })
});

app.post('/getmountingbyall', function(req, res){
    var car = req.body.cars;
    var address = req.body.chosenPlace;
    var category = req.body.categories;
    Master.findAll({where: {
        cars: {$contains :car},
        services: req.body.services,
        "chosenPlace.FormattedAddress": {$like :"%" + address.FormattedAddress},
        "categories": {
            [category]: "true"
        },
        mounting: req.body.mounting
    }}).then(function(result){
        res.json(result);
    })
});

app.post('/getcarwashbyall', function(req, res){
    var car = req.body.cars;
    var address = req.body.chosenPlace;
    var category = req.body.categories;
    Master.findAll({where: {
        cars: {$contains :car},
        services: req.body.services,
        "chosenPlace.FormattedAddress": {$like :"%" + address.FormattedAddress},
        "categories": {
            [category]: "true"
        },
        carWash: req.body.carWash
    }}).then(function(result){
        res.json(result);
    })
});

app.post('/gettowtruckbyall', function(req, res){
    var car = req.body.cars;
    var address = req.body.chosenPlace;
    var category = req.body.categories;
    Master.findAll({where: {
        cars: {$contains :car},
        services: req.body.services,
        "chosenPlace.FormattedAddress": {$like :"%" + address.FormattedAddress},
        "categories": {
            [category]: "true"
        },
        towTruck: req.body.towTruck
    }}).then(function(result){
        res.json(result);
    });
});

app.post('/getrate', function(req, res){
    Master.update({
        rate: req.body.rate,
        rateAll: req.body.rateAll,
        amountComments: req.body.amount
    },{where:
    {id : req.body.id }
    }).then(function(result){
        res.json(result);
    });
});

app.listen(process.env.PORT||3001, function(){
    console.log("listen on server 3001");
});
