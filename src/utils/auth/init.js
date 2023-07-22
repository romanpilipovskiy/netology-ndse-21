const login = require('./logIn')
const signup = require('./signUp')
const User = require('../../models/user')

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        console.log('Сериализованный пользователь: ')
        done(null, user._id)
    })

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            console.log('Десериализованный пользователь: ', user)
            done(err, user)
        })
    })

    login(passport)
    signup(passport)
}
