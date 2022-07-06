const cors = require ("cors")
function routerPath (name) {
    return require(`./${name}`)
}

function route (app) {
    //Apply Cors
    app.use(cors())

    app.use("/users",routerPath("userRouter"))
    app.use("/dices-detail-history",routerPath("diceHistoryRouter"))
    app.use("/prizes",routerPath("prizeRouter"))
    app.use("/vouchers",routerPath("voucherRouter"))
    app.use("/",routerPath("rollRouter"))
}

module.exports=route;