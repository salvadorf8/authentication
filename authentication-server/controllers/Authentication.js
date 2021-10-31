const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

const config = require('../config');
const User = mongoose.model('user');

const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    //jwt sub is a convention stand for subject - who does this belong to
    // jwt iat is another convention: issued at time
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.signin = function (req, res, next) {
    //User has already had their email and password auth'd
    //we just need to give them a token

    res.send({ token: tokenForUser(req.user) });
};

exports.signup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide an email and password' });
    }

    // after searching, it will invoke a callback
    await User.findOne({ email: email }, async (err, existingUser) => {
        if (err) {
            return next(err);
        } else if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }

        const user = new User({
            email: email,
            password: password
        });

        // encrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save(function (err) {
            if (err) {
                return next(err);
            }
            console.log('completed, returning a token');
            // Respond to request indicating the user was created
            res.json({ token: tokenForUser(user) });
        });
    });
};
