const {Schema, model} = require('mongoose')
const { v4: uuid } = require('uuid');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    _id: {
        type: String,
        default: () => uuid(),
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    }
})

userSchema.plugin(passportLocalMongoose);

module.exports = model('User', userSchema)