var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    secure: true, // use SSL
    auth: {
        user: 'EmailCarsService@gmail.com',//pomeniat v nasroykah gmail -dostup dla prilozheniy
        pass: 'PasswordCarsService'
    }
});

// setup e-mail data with unicode symbols
function sendMail(email, password){
    var mailOptions = {
        from: '"carsService" <beta.qween@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Authentic', // Subject line
        text: 'Your password', // plaintext body
        html: '<b>Your password is ' + password +'</b>' // html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

module.exports = { transporter, sendMail };
