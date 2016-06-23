/**
 * Created by kamill on 6/5/16.
 */
var dbClass = require('./database');
var currentdate = new Date();
var db = new dbClass(process.env.DATABASE_URL || 'postgres://radius:radiuspostgresql@localhost/radius');

module.exports = {
    checkNumber: function (number, code) {
        db.findNumber(number, function(err, res) {
            console.log(err);
            if(!err) {
                if(res.rows[0].exists) {
                    console.log(currentdate.getDate() + "/"
                        + (currentdate.getMonth()+1)  + "/"
                        + currentdate.getFullYear() + " @ "
                        + currentdate.getHours() + ":"
                        + currentdate.getMinutes() + ":"
                        + currentdate.getSeconds() + "   I want to update " + number);
                    db.updateCode(number, code, function (err) {
                        if (err) {
                            console.log('error: ' + err);
                        } else console.log(currentdate.getDate() + "/"
                            + (currentdate.getMonth()+1)  + "/"
                            + currentdate.getFullYear() + " @ "
                            + currentdate.getHours() + ":"
                            + currentdate.getMinutes() + ":"
                            + currentdate.getSeconds() + "   I updated " + number);
                    });
                } else {
                    db.newUser(number, function(err){
                        if (err) {
                            console.log('error: ' + err);
                        } else console.log(currentdate.getDate() + "/"
                            + (currentdate.getMonth()+1)  + "/"
                            + currentdate.getFullYear() + " @ "
                            + currentdate.getHours() + ":"
                            + currentdate.getMinutes() + ":"
                            + currentdate.getSeconds() + "  I added " + number);
                    });
                    db.addGroup(number, code, function(err){
                        if (err) {
                            console.log('error: ' + err);
                        } else console.log(currentdate.getDate() + "/"
                            + (currentdate.getMonth()+1)  + "/"
                            + currentdate.getFullYear() + " @ "
                            + currentdate.getHours() + ":"
                            + currentdate.getMinutes() + ":"
                            + currentdate.getSeconds() + "  I added group " + number);
                    });
                }
            } else {
                console.log('error: ' + err);
                //db.client.end();
            }
        });
},
    // Have to add phone number!
    checkCode: function (code, callback) {
        var result;
        db.findCode(code, function (err, res) {
            if(!err){
                result = res.rows[0].exists;
                if(result){
                    console.log(currentdate.getDate() + "/"
                        + (currentdate.getMonth()+1)  + "/"
                        + currentdate.getFullYear() + " @ "
                        + currentdate.getHours() + ":"
                        + currentdate.getMinutes() + ":"
                        + currentdate.getSeconds() + "   Codes are the same " + code);
                    callback(result);
                } else {
                    console.log(currentdate.getDate() + "/"
                        + (currentdate.getMonth()+1)  + "/"
                        + currentdate.getFullYear() + " @ "
                        + currentdate.getHours() + ":"
                        + currentdate.getMinutes() + ":"
                        + currentdate.getSeconds() + "   Codes are not the same " + code);
                    callback(result);

                }
            } else {
                console.log('error: ' + err);
            }
        });
        }
};