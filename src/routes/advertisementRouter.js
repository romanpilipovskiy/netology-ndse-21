const router = require('express').Router();
const AdvertisementModule = require('../modules/advertisementModule');
const advertisementFile = require('../middleware/file');

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
};

module.exports = () => {
    router.get('/', isAuthenticated, async (req, res) => {
        const advertisements = await AdvertisementModule.getAll();
        if (advertisements.result) {
            res.json({ success: true, data: advertisements.data });
        } else {
            res.json({ success: false, error: advertisements.error });
        }
    });
    router.post('/find', isAuthenticated, async (req, res) => {
        const advertisement = await AdvertisementModule.find(req.body);
        if (advertisement.result) {
            res.json({ success: true, data: advertisement.data });
        } else {
            res.json({ success: false, error: advertisement.error });
        }
    });
    router.post('/', isAuthenticated, async (req, res) => {
        const advertisement = await AdvertisementModule.create(req.body);
        if (advertisement.result) {
            res.json({ success: true, data: advertisement.data });
        } else {
            res.json({ success: false, error: advertisement.error });
        }
    });
    router.delete('/', isAuthenticated, async (req, res) => {
        const advertisement = await AdvertisementModule.remove(req.body.id);
        if (advertisement.result) {
            res.json({ success: true, data: 'Объявление удалено' });
        } else {
            res.json({ success: false, error: advertisement.error });
        }
    });

    router.post(
        '/upload',
        isAuthenticated,
        advertisementFile.single('file'),
        (req, res) => {
            if (req.file) {
                const { originalname } = req.file;
                res.json({ success: 'OK', fileName: originalname });
            }
            res.json();
        }
    );

    return router;
};
