/**
 * Created by kamill on 03.06.16.
 */
var currentdate = new Date();
var workDB = require('./workingwithDB');
var passport = require('passport');
module.exports = function(app){
    sess = new Object();
    //Enter through phone number
    app.get('/', function (request, response){
        response.render('start.html');
    });

    //Enter through ActiveDirectory
    app.get('/ad', function (request, response){
        response.render('local.html');
    });

    //Code from
    app.get('/code', function(request, response){
        if(sess.hasOwnProperty('phone')){
            response.render('code.html');
        } else {
            response.redirect('/');
        }

    });

    app.post('/', function (request, response) {
        var number = request.body.number || '';
        if (number != ''){
            number = '7' + number.replace(/[ ()-]/ig, "");
            sess.phone = number;
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
        } else {
            response.json({
                result: false,
                error: "Phone number is required."
            });
        }
    });

    app.post('/ad', function (request, response) {
        var email = request.body.email || '';
        if (email != '') {
            var password = request.body.password || '';
            if (password != ''){
                //get information from AD
                //...
                if (email == 'k.gusmanov@innopolis.ru' && password == '123456'){
                    console.log(currentdate.getDate() + "/"
                        + (currentdate.getMonth()+1)  + "/"
                        + currentdate.getFullYear() + " @ "
                        + currentdate.getHours() + ":"
                        + currentdate.getMinutes() + ":"
                        + currentdate.getSeconds() +  "   Email: " + email + " Password: " + password);
                    response.json({
                        result: true
                    });
                } else {
                    response.json({
                        result: false,
                        error: "Invalid email or password"
                    });
                }
            }
        }
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