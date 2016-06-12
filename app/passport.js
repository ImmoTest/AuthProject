/**
 * Created by kamill on 6/9/16.
 */
var passport = require('passport');
var vkStrategy = require('passport-vkontakte').Strategy;
var dbClass = require('./database');
var currentdate = new Date();
var db = new dbClass(process.env.DATABASE_URL || 'postgres://radius:radiuspostgresql@localhost/radius');
passport.use(new vkStrategy({
    clientID:      5501094,
    clientSecret: "upiz9JRrTsuO4w4saBJs",
    callbackURL: "http://wifi1.university.innopolis.ru/vk/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds() + "   I want to add vk user " + profile.displayName);
        db.addVk(profile.displayName, profile.id, function (err) {
            if (err) {
                console.log('error: ' + err);
            } else console.log(currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds() + "   I added vk user " + profile.displayName);
            //db.client.end();
        });
        return done(null, {
            username: profile.displayName,
            id: profile.id,
            profileUrl: profile.profileUrl
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});