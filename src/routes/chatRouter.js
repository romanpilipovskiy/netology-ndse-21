const router = require('express').Router();
const chatModule = require('../modules/chatModule');
const cors = require('cors');
router.use(cors());
router.use(
    cors({
        origin: '*',
    })
);

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
};

module.exports = () => {
    router.post('/show/:id', isAuthenticated, async (req, res) => {
        const data = {
            userId: req.body.userId,
            chatId: req.body.chatId,
        };
        const chat = await chatModule.findById(data);
        if (chat.result) {
            res.send({ result: true, data: chat.data });
        } else {
            res.json({ result: false, error: chat.error });
        }
    });
    router.post('/usersChat', isAuthenticated, async (req, res) => {
        const chat = await chatModule.find(req.body.users);
        if (chat.result) {
            res.json({ result: true, data: chat.data });
        } else {
            res.json({ result: true, error: chat.error });
        }
    });
    //post message
    router.post('/create', isAuthenticated, async (req, res) => {
        const chat = await chatModule.sendMessage(req.body);
        if (chat.result) {
            res.json({ result: true, data: chat.data });
        } else {
            res.json({ result: true, error: chat.error });
        }
    });

    router.post('/message', isAuthenticated, async (req, res) => {
        const { chatId, messId } = req.body;
        const chat = await chatModule.readMessage(chatId, messId);

        if (chat.result) {
            res.json({ success: true, data: chat.data });
        } else {
            res.json({ result: false, error: chat.error });
        }
    });
    router.post('/history/:id', isAuthenticated, async (req, res) => {
        const chat = await chatModule.getHistory(req.params.id);
        res.json({ success: chat.result, data: chat.data });
    });

    router.post('/subscribe', isAuthenticated, async (req, res) => {
        const data = {
            userId: req.body.userId,
            chatId: req.body.chatId,
        };
        const subscribe = await chatModule.subscribe(data);
        console.log(subscribe);
        if (subscribe.result) {
            res.json({ success: true, data: subscribe.data });
        } else {
            res.json({ success: false, error: subscribe.error });
        }
    });

    return router;
};
