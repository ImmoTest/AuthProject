/**
 * Created by kamill on 03.06.16.
 */
var currentdate = new Date();
var workDB = require('./workingwithDB')
module.exports = function(app){

    //Enter through phone number
    app.get('/', function (request, response){
        response.render('phoneenter.html');
    });

    //Enter through ActiveDirectory
    app.get('/ad', function (request, response){
        response.render('stempenter.html');
    });

    //Code from
    app.get('/code', function(request, response){
        response.render('smsenter.html');
    });

    app.post('/', function (request, response) {
        var number = request.body.number;
        number = number.replace(/[ ()-]/ig, "");
        var code = Math.floor(Math.random() * 99999) + 10000;
        console.log(currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds() + '   For number ' + number + ' Sent code ' + code);
        workDB.checkNumber(number, code);
        // Here must be function, that sends code to user
        response.redirect('/code');
    });

    app.post('/ad', function (request, response) {
        var email = request.body.email;
        var password = request.body.pwd;
        console.log(currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds() +  "   Email: " + email + " Password: " + password);
    });

    app.post('/code', function (request, response) {
        var code = request.body.ucode;
        console.log(currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds() + "   Get code: " + code);
        // Have to add session for checking code via phone number!
        workDB.checkCode(code, function (res) {
            if(res){
                console.log(currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/"
                    + currentdate.getFullYear() + " @ "
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds() + "   Redirect to google.com with code: " + code)
                response.redirect('http://google.com');
            } else {
                console.log(currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/"
                    + currentdate.getFullYear() + " @ "
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds() + "   Wrong code: " + code);
                response.redirect('/code');
            }
        });
    });

};