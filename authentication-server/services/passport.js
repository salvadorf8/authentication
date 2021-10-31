const passport = require('passport');
const bcrypt = require('bcrypt');
const { ExtractJwt } = require('passport-jwt');
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
const config = require('../config');

// Create a local Strategy for the signin route
passport.use(
    new LocalStrategy(
        // prepare the Options for the local strategy function
        {
            usernameField: 'email',
            password: 'password'
        },

        function (email, password, done) {
            console.log('local passport');

            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }

                bcrypt.compare(password, user.password, function (err, isMatch) {
                    if (err) {
                        return done(err);
                    }
                    if (!isMatch) {
                        return done(null, false);
                    }
                    return done(null, user);
                });
            });
        }
    )
);

// Create a JWT strategy to perform an Unauthorize check
passport.use(
    new JWTStrategy(
        // prepare the Options for the JWT strategy
        {
            // token can be anywhere, we have to specifically say to extract the Token from the Header
            // secretOrKey is the key to decrypt the Token
            jwtFromRequest: ExtractJwt.fromHeader('authorization'),
            secretOrKey: config.secret
        },

        async (jwtPayload, done) => {
            console.log('here I am');
            // payload is the decoded jwt token done behind the scenes
            // done is a callback function we need to call if we are successful or not
            // see if the user ID in the payload exists in our database - if not, return done with false
            await User.findById(jwtPayload.sub, function (err, user) {
                if (err) {
                    return done(err, false);
                }

                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        }
    )
);
