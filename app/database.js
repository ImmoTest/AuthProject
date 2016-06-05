/**
 * Created by kamill on 6/5/16.
 */
var pg = require('pg');

function DB (conectionString) {
    this.client = new pg.Client(conectionString);
    this.client.connect();
}

DB.prototype.newUser = function(number, code, callback) {
    var query = this.client.query('INSERT INTO users VALUES ($1, $2)', [number, code], function (err, result) {
        callback(err);
    });
};

DB.prototype.findNumber = function(number, callback) {
    var query = this.client.query('SELECT EXISTS(SELECT 1 FROM users WHERE phnumber = $1)', [number], function (err, result) {
        callback(err, result);
    });
};

DB.prototype.updateCode = function(number, code, callback) {
    var query = this.client.query('UPDATE users SET code = $1 WHERE phnumber = $2', [code, number], function(err, result) {
        callback(err);
    });

DB.prototype.findCode = function(number, code, callback){
    var query = client.query('SELECT EXISTS(SELECT 1 FROM users WHERE phnumber = $1 AND code = $2)', [number, code], function (err, result) {
        callback(err, result);
    })
}
};

module.exports = DB;

// module.exports = {
//     newUser: function (number, code, callback) {
//
//         var query = client.query('INSERT INTO users VALUES ($1, $2)', [number, code]);
//         query.on('end', function () {
//             client.end();
//             callback();
//         });
//     },
//
//     findNumber: function (number, callback) {
//        // client.connect();
//         var result;
//         var query = client.query('SELECT EXISTS(SELECT 1 FROM users WHERE phnumber = $1)', [number]);
//         query.on('row', function (row) {
//             result = row.exists;
//         });
//         query.on('end', function () {
//             client.end();
//             callback(result);
//         });
//     },
//
//     findCode: function (number, code, callback)
//     {
//     //client.connect();
//     var result;
//     var query = client.query('SELECT EXISTS(SELECT 1 FROM users WHERE phnumber = $1 AND code = $2)', [number, code]);
//     query.on('row', function (row) {
//         result = row.exists;
//     });
//     query.on('end', function () {
//         client.end();
//         callback(result);
//     });
//     },
//
// //findCode(9876453214, 45869, function (res) {
// //  if(res){
// //    console.log(true);
// //} else {
// //    console.log(false);
// //}
// //});
//
//     updateCode: function (number, code) {
//         //client.connect();
//         var query = client.query('UPDATE users SET code = $1 WHERE phnumber = $2', [code, number]);
//         query.on('end', function () {
//             client.end();
//         });
//     }
// };