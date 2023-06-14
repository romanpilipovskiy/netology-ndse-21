const http = require('http');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
const User = require('./models/users');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const { initBooks, initUsers } = require('./models/init');
const logger = require('./middleware/logger');
const error404 = require('./middleware/error404');
const booksRouter = require('./routes/books');

require('dotenv').config();

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
        secret: '$uP3r_SecR3T',
        resave: false,
        saveUninitialized: false
    })
);

app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(logger);

io.on('connection', (socket) => {
    const {id} = socket;
    console.log(`Socket connected: ${id}`);

    const {bookId} = socket.handshake.query;
    console.log(`Socket bookId: ${bookId}`);
    socket.join(bookId);
    socket.on('message', (msg) => {
        msg.type = `bookId: ${bookId}`;
        socket.to(bookId).emit('message', msg);
        socket.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`);
    });
});

app.get('/',
    connectEnsureLogin.ensureLoggedIn('/login'),
    (req, res) => res.redirect('/books')
);

app.get('/login', (req, res) => {
    res.render('users/login', { 
        title: 'Авторизация',
        titleDetail: ''
    });
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            if (err) {
                return next(err);
            }

        if (!user) {
            return res.redirect('/login?info=' + info);
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            return res.redirect('/');
        });
    })(req, res, next);
});

app.get('/signup', (req, res) => {
    res.render('users/signup', { 
        title: 'Регистрация',
        titleDetail: ''
    });
});

app.post('/signup', async (req, res) => {
    await User.register({username: req.body.username, active: true}, req.body.password);
    return res.redirect('/login');
});

app.use('/profile', (req, res) => {
    connectEnsureLogin.ensureLoggedIn('/login'),
    res.render('users/profile', { 
        title: 'Профиль',
        titleDetail: ` | `,
        user: req.user
    });
});

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

app.use('/books',
    connectEnsureLogin.ensureLoggedIn('/login'),
    booksRouter
);

app.use(error404);

const PORT = process.env.PORT || 3000;

const URL_DB = process.env.URL_DB;

async function start(PORT, URL_DB) {
    try {
        await mongoose.connect(URL_DB);
        await initBooks();
        await initUsers();
        server.listen(PORT, () => {
            console.log(`App is running on port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}

start(PORT, URL_DB);

