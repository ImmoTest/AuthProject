/**
 * Created by kamill on 03.06.16.
 */
var currentdate = new Date();
var workDB = require('./workingwithDB');
var smsru = require('sms_ru');
var sms = new smsru('B7541315-CBA8-6CAE-87F6-BC2E7ADA5A42');
var passport = require('passport');
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
        number = '7' + number.replace(/[ ()-]/ig, "");
        var code = Math.floor(Math.random() * 99999) + 10000;
        console.log(currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds() + '   For number ' + number + ' Sent code ' + code);
        workDB.checkNumber(number, code);
        //Send code to user
        sms.sms_send({
            to: number,
            text: code
        }, function(e){
            console.log(e.description);
        });
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
                    + currentdate.getSeconds() + "   Redirect to university.innopolis.ru with code: " + code)
                response.redirect('http://university.innopolis.ru/');
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

    app.get('/vk', passport.authenticate('vkontakte'), function(request, response){

    });

    app.get('/vk/callback', passport.authenticate('vkontakte', {failureRedirect: '/'}),
    function(request, response) {
        response.redirect('http://university.innopolis.ru/');
    });

};