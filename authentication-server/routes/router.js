const passport = require('passport');

const Authentication = require('../controllers/Authentication');
require('../services/passport');

// using the jwt strategy, and when successfull do not create a cookie based session for them
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
    app.get('/', requireAuth, function (req, res) {
        res.send({ hi: 'You exist in the DB, therefore you may visit this link' });
    });

    app.post('/signup', Authentication.signup);

    app.post('/signin', requireSignin, Authentication.signin);
};
