const AdvertisementModel = require('../models/advertisement');

const AdvertisementModule = {
    getAll: async () => {
        try {
            const advertisements = await AdvertisementModel.find().select(
                '-__v'
            );
            return { result: true, data: advertisements };
        } catch (error) {
            return { result: true, error: error };
        }
    },
    find: async (props) => {
        try {
            if (props.param === 'userId') {
                const advertisement = await AdvertisementModel.find({
                    userId: props.value,
                }).select('-__v');
                return { result: true, data: advertisement };
            }
            const reg = new RegExp(props.value);
            const advertisement = await AdvertisementModel.find({
                [props.param]: reg,
            }).select('-__v');
            return { result: true, data: advertisement };
        } catch (error) {
            return { result: true, error: error };
        }
    },
    create: async (data) => {
        const newAdvertisement = new AdvertisementModel(data);
        try {
            await newAdvertisement.save();
            return { result: true, data: newAdvertisement };
        } catch (error) {
            return { result: false, error: error };
        }
    },
    remove: async (id) => {
        try {
            const date = Date.now();
            await AdvertisementModel.updateOne(
                { id: id },
                { $set: { isDeleted: true, updatedAt: date } }
            );
            return { result: true };
        } catch (error) {
            return { result: false, error: error };
        }
    },
};

module.exports = AdvertisementModule;
