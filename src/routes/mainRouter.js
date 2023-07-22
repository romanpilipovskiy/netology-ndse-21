const router = require('express').Router();

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
};

module.exports = () => {
    router.get('/', isAuthenticated, (req, res) => {
        res.json({ result: 'OK', page: 'main' });
    });

    return router;
};
