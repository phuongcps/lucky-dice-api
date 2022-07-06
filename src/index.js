const express = require ("express");
const app = express ();
//const morgan = require ("morgan")
const database = require('./config/database')
const route = require('./router/index.js')

const path = require ("path")
const port = 3000;

//app.use(morgan("combined"))

// Body Parser
app.use (express.json())
app.use (express.urlencoded({
    extended:true
}))

// Connect Mongoose
database.connect();

// Route Setting
route(app)

app.use (express.static(`${__dirname}/resources/view/homepage`))
app.get("/",(req,res) => {
    //console.log("test")
    res.sendFile(path.join(`${__dirname}/resources/view/homepage/Project Lucky Dice - Bootstrap.html`))
    //res.send ("Welcome to Heroku - Phương")
})

app.listen(process.env.PORT || port, () => {
    // console.log (`App đang chạy trên port ${port} . Thời gian bắt đầu chạy là ${new Date()}`)
    console.log(`Running on port ${process.env.PORT}`)
})