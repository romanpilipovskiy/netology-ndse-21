const express = require('express');
const path = require('path');
const expressSession = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const http = require('http');

const app = express();

const server = http.createServer(app);
const initPassport = require('./utils/auth/init');

const userRouter = require('./routes/userRouter')(passport);
const mainRouter = require('./routes/mainRouter')(passport);
const chatRouter = require('./routes/chatRouter')(passport);
const advertisementRouter = require('./routes/advertisementRouter')(passport);

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});

const { chatSocket } = require('./utils/socketIo');

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.HTTP_PORT || 3000;

initPassport(passport);

app.use(
    express.json({
        type: ['application/json', 'text/plain'],
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..' + '/public')));

app.use(
    expressSession({
        secret: 'mySecretKey',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/login', userRouter);
app.use('/', mainRouter);
app.use('/chat', chatRouter);
app.use('/advertisement', advertisementRouter);

mongoose.set('strictQuery', true);

async function start(PORT, MONGO_URL) {
    try {
        await mongoose.connect(MONGO_URL);

        server.listen(PORT, () => {
            console.log(`Library listening host ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }

    chatSocket(io);
}

start(PORT, MONGO_URL);
