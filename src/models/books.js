const {Schema, model} = require('mongoose')
const { v4: uuid } = require('uuid');

const bookSchema = new Schema({
    _id: {
        type: String,
        default: () => uuid(),
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    authors: {
        type: String,
        default: ""
    },
    favorite: {
        type: Boolean,
        default: false
    },
    fileCover: {
        type: String,
        default: ""
    },
    fileName: {
        type: String,
        default: ""
    },
    fileBook: {
        type: String,
        default: ""
    }
})

module.exports = model('Book', bookSchema)