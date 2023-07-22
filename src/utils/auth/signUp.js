const LocalStrategy = require('passport-local').Strategy
const User = require('../../models/user')
const UserModule = require('../../modules/userModule')
const bCrypt = require('bcryptjs')

module.exports = function (passport) {
    passport.use(
        'signup',
        new LocalStrategy(
            {
                passReqToCallback: true,
            },
            (req, username, password, done) => {
                findOrCreateUser = function () {
                    User.findOne({ name: username }, async (err, user) => {
                        if (err) {
                            console.log('Ошибка регистрации: ' + err)
                            return done(err)
                        }
                        if (user) {
                            console.log(
                                `Пользователь ${username} уже зарегистрирован`
                            )
                            return done(
                                null,
                                false,
                                console.log(
                                    `Пользователь ${username} уже зарегистрирован`
                                )
                            )
                        } else {
                            const { email, contactPhone } = req.body
                            const data = {
                                name: username,
                                passwordHash: createHash(password),
                                email,
                                contactPhone,
                            }
                            const user = await UserModule.create(data)
                            if (user.result) return done(null, user.newUser)
                            if (!user.result) {
                                console.log(user.text)
                                throw user.error
                            }
                        }
                    })
                }
                process.nextTick(findOrCreateUser)
            }
        )
    )
    const createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
    }
}
