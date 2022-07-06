const express = require ("express");
const app = express ();
// const morgan = require ("morgan")
// const {timeRun} = require("./app/middle/middle");
// const cors = require ("cors")
// const database = require('./config/database')
// function routerPath (name) {
//     return require(`./router/${name}`)
// }
const path = require ("path")


// const port = 5000;

// app.use(morgan("combined"))

// //app.use (timeRun)
// app.use (express.json())
// app.use (express.urlencoded({
//     extended:true
// }))

// database.connect();



// app.use(cors())
// app.use("/users",routerPath("userRouter"))
// app.use("/dices-detail-history",routerPath("diceHistoryRouter"))
// app.use("/prizes",routerPath("prizeRouter"))
// app.use("/vouchers",routerPath("voucherRouter"))
// app.use("/roll",routerPath("rollRouter"))

app.use (express.static(`${__dirname}/resources/view/homepage`))

app.get("/",(req,res) => {
    //console.log("test")
    res.sendFile(path.join(`${__dirname}/resources/view/homepage/Project Lucky Dice - Bootstrap.html`))
    res.send ("Welcome to Heroku - Phương")
})

app.listen(process.env.PORT || 3000, () => {
    // console.log (`App đang chạy trên port ${port} . Thời gian bắt đầu chạy là ${new Date()}`)
    console.log(`Running on port ${process.env.PORT}`)
})