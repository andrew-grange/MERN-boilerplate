const passport = require('passport'),
    Author = require('../models/userModel'),
    config = require('./index'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    Author.findOne({ email: email }, function(err, author) {
        if(err) { return done(err); }
        if(!author) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

        author.comparePassword(password, function(err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

            return done(null, author);
        });
    });
});

const jwtOptions = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    // Telling Passport where to find the secret
    secretOrKey: config.jwtSecret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    Author.findById(payload._id, function(err, author) {
        if (err) { return done(err, false); }

        if (author) {
            done(null, author);
        } else {
            done(null, false);
        }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);