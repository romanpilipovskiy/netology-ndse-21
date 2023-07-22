const router = require('express').Router();

module.exports = (passport) => {
    router.get('/', (req, res) => {
        res.json({ result: 'OK', page: 'login' });
    });
    router.post(
        '/',
        passport.authenticate('login', {
            successRedirect: '/',
            failureRedirect: '/login',
        })
    );
    router.post(
        '/signup',
        passport.authenticate('signup', {
            successRedirect: '/',
            failureRedirect: '/signup',
        })
    );
    router.get('/signup', (req, res) => {
        res.json({ result: 'OK', page: 'signup' });
    });
    router.get('/signout', (req, res, next) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/login');
        });
    });

    return router;
};
