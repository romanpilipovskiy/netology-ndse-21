const { Schema, model } = require('mongoose');

const AdvertisementSchema = new Schema({
    shortText: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    images: {
        type: Array,
        default: [],
    },
    userId: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: '',
    },
    tags: {
        type: Array,
        default: '',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

module.exports = model('Advertisement', AdvertisementSchema);
