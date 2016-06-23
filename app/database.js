/**
 * Created by kamill on 6/5/16.
 */
var pg = require('pg');

function DB (conectionString) {
    this.client = new pg.Client(conectionString);
    this.client.connect();
}

DB.prototype.newUser = function(number, code, callback) {
    var query = this.client.query("INSERT INTO radcheck (username, attribute, op, value) VALUES ($1, $2, $3, $4)", [number, 'Cleartext-Password', ':=', code], function (err, result) {
        callback(err);
    });
};

DB.prototype.addGroup = function(number, callback) {
    var query=this.client.query("INSERT INTO radusergroup (username, groupname) VALUES($1, $2)", [number, 'guest'], function(err, result) {
        callback(err);
    });
};

DB.prototype.findNumber = function(number, callback) {
    var query = this.client.query('SELECT EXISTS(SELECT 1 FROM radcheck WHERE username = $1)', [number], function (err, result) {
        callback(err, result);
    });
};

DB.prototype.updateCode = function(number, code, callback) {
    var query = this.client.query('UPDATE radcheck SET value = $1 WHERE username = $2', [code, number], function (err, result) {
        callback(err);
    });
};

DB.prototype.findCode = function(code, callback){
    var query = this.client.query('SELECT EXISTS(SELECT 1 FROM radcheck WHERE value = $1)', [code], function (err, result) {
        callback(err, result);
    });
};

DB.prototype.addVk = function(username, id, callback) {
    var query = this.client.query("INSERT INTO radcheck (username, attribute, op, value) VALUES ($1, $2, $3, $4)", [username, 'Cleartext-Password', ':=', id], function (err, result) {
        callback(err);
    });
};

module.exports = DB;