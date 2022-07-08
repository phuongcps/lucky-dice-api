const session = require('express-session');

function setup (app) {
    app.use(session({
        secret: 'work hard',
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 60000*60 }
    }));
}

module.exports = setup;
