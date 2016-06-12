/**
 * Created by kamill on 03.06.16.
 */
var express = require('express');
var cors = require('cors');
var app = express();
var passport = require('passport');
var port = process.env.PORT || 80;
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var helmet = require('helmet');
var expressSession = require('express-session');

app.engine('html', require('ejs').renderFile);
app.use(cors());
app.use(expressSession({secret: 'secrettoken'}));
app.use('/public/css', express.static(__dirname + '/public/css'));
app.use('/public/js', express.static(__dirname + '/public/js'));
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(passport.initialize());
app.use(helmet());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.disable('x-powered-by');


//boot============================================
require('./app/passport')   ;


//routes===========================================
require('./app/routes')(app);

//launch===========================================
app.listen(port);
console.log('The magic happens on port ' + port);

