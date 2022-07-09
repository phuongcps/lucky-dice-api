const express = require ("express");
const app = express ();
//const morgan = require ("morgan")
const database = require('./config/database')
const route = require('./router/index.js')
const { engine } = require('express-handlebars');
const session = require('./config/auth/session');
const passport = require('./config/auth/passport');

const methodOverride = require('method-override')


const path = require ("path")
const port = 9000;

//app.use(morgan("combined"))

// Body Parser
app.use (express.json())
app.use (express.urlencoded({
    extended:true
}))

// Connect Mongoose
database.connect();

// Template engine
app.engine('hbs',engine({
    extname:'hbs',
    helpers : {
        json: function(obj) {
            return JSON.stringify(obj);
        }
    }
}));
app.set('view engine','hbs');
app.set('views',path.join(__dirname, 'resources', 'views'))
app.use(express.static('src/public'))
app.use(methodOverride("_method"))

// Setup session
session(app);

//Connect and Setup Passport
passport(app);

// Route Setting
route(app)

app.get("/",(req,res) => {
    if (req.session.passport) {
        let user = req.user.toObject()
        res.render("home",{user})
    } else {
        res.redirect("/auth/login")
    }
    //res.render("home")
    //console.log("test")
    //res.sendFile(path.join(`${__dirname}/resources/views/homepage/Project Lucky Dice - Bootstrap.html`))
    //res.send ("Welcome to Heroku - Phương")
})

app.listen(process.env.PORT || port, () => {
    // console.log (`App đang chạy trên port ${port} . Thời gian bắt đầu chạy là ${new Date()}`)
    console.log(`Running on port ${process.env.PORT}`)
})