/**
 * Created by kamill on 6/5/16.
 */
var dbClass = require('./database');
var db = new dbClass(process.env.DATABASE_URL || 'postgres://postgres:c8009991861@localhost/postgres');

function checkNumber(number, code) {

    db.findNumber(number, function(err, res) {
        if(!err) {
            if(res.rows[0].exists) {
                console.log("I want to update.");
                db.updateCode(number, code, function (err) {
                    if (err) {
                        console.log('error: ' + err);
                    } else console.log("I updated.");
                    db.client.end();
                });
            } else {
                console.log("I want to add new user.");
                db.newUser(number, code, function(err){
                    if (err) {
                        console.log('error: ' + err);
                    } else console.log("I added.");
                    db.client.end();
                });
            }
        } else {
            console.log('error: ' + err);
            db.client.end();
        }
    });
}

function checkCode(number, code) {
    db.findCode(number, code, function (err, res) {
        if(!err){
            if(res.rows[0].exists){
                console.log("Codes for number " + number + " are the same");
                db.client.end();
            } else {
                console.log("Codes for number " + number + " are not the same");
                db.client.end();
            }
        } else {
            console.log('error: ' + err);
            db.client.end();
        }
    });
}

checkCode(9876453214, 10689);