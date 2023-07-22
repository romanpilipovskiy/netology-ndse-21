var LocalStrategy = require('passport-local').Strategy
var User = require('../../models/user')
var bCrypt = require('bcryptjs')

module.exports = function (passport) {
    passport.use(
        'login',
        new LocalStrategy(
            {
                passReqToCallback: true,
            },
            function (req, username, password, done) {
                User.findOne({ name: username }, function (err, user) {
                    if (err) return done(err)
                    if (!user) {
                        console.log(`Пользователь ${username} не найден`)

                        return done(
                            null,
                            false,
                            console.log(
                                'error',
                                `Пользователь ${username} не найден`
                            )
                        )
                    }
                    if (!isValidPassword(user, password)) {
                        return done(
                            null,
                            false,
                            console.log('error', 'Неверный пароль')
                        )
                    }

                    return done(null, user, console.log('Login'))
                })
            }
        )
    )

    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.passwordHash)
    }
}
