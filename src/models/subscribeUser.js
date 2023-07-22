const { Schema, model } = require('mongoose');

const SubscribeUserSchema = new Schema({
    user: {
        type: String,
        default: '',
    },
    chats: {
        type: Array,
        default: [],
    },
});

module.exports = model('SubscribeUser', SubscribeUserSchema);
