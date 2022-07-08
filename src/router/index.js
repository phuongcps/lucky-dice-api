const cors = require ("cors")
const userRouter = require('./userRouter')
const diceHistoryRouter = require('./diceHistoryRouter')
const prizeRouter = require('./prizeRouter')
const voucherRouter = require('./voucherRouter')
const rollRouter = require('./rollRouter')
const authRouter = require('./authRouter')

function route (app) {
    //Apply Cors
    app.use(cors())

    app.use("/users",userRouter)
    app.use("/dices-detail-history",diceHistoryRouter)
    app.use("/prizes",prizeRouter)
    app.use("/vouchers",voucherRouter)
    app.use("/auth",authRouter)
    app.use("/",rollRouter)
}

module.exports=route;