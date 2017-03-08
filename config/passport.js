var TwitterStrategy  = require('passport-twitter').Strategy;
var User = require('../models/users.js');
var configAuth = require('./auth');

module.exports = function (passport) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
      done(null, id);
  });

  passport.use(new TwitterStrategy({
      consumerKey     : configAuth.twitterAuth.consumerKey,
      consumerSecret  : configAuth.twitterAuth.consumerSecret,
      callbackURL     : configAuth.twitterAuth.callbackURL
    },
    function(token, tokenSecret, profile, done) {

      process.nextTick(function () {

        User.findOne({username: profile.username}, function(err, user) {

        if (err) {
          return done(err);
        }
          else if (user) {
            console.log(user, "userfound!");
            return done(null, user);
          } else {
            console.log("creating new user for DB")
            // Create new user
            var newUser = new User();
            newUser.username = profile.username;
            console.log(profile.photos);
            newUser.image = profile.photos[0].value;

            newUser.save(function (user) {
              return done(null, user);
            });
          }
        });
      })
  }));

}
