/**
 * Created by kamill on 03.06.16.
 */
var currentDate = new Date();
var workDB = require('./workingwithDB')
module.exports = function(app){

    //Enter through phone number
    app.get('/', function (request, response){
        response.render('phoneenter.html');
    });

    //Enter through ActiveDirectory
    app.get('/ad', function (request, response){
        response.render('stempenter.html');
        //console.log(request);
    });

    //Code from
    app.get('/code', function(request, response){
        response.render('smsenter.html');
    });

    app.post('/', function (request, response) {
        var number = request.body.number;
        console.log(number);
        number = number.replace(/[ ()-]/ig, "");
        var code = Math.floor(Math.random() * 99999) + 10000;
        console.log(currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds() + '  For number ' + number + ' Sent code ' + code);
        workDB.checkNumber(number, code);
        response.redirect('/code');

    });

    app.post('/ad', function (request, response) {
        var email = request.body.email;
        var password = request.body.pwd;
        console.log("Email: " + email + " Password: " + password);
    });

}