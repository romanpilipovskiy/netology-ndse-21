const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        default: '',
    },
    passwordHash: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
    },
    contactPhone: {
        type: String,
        default: '',
    },
});

module.exports = model('User', UserSchema);
