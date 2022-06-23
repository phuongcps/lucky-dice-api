const express = require ("express");
const {rollDice,getVoucherHistory,getPrizeHistory,getDiceHistory} = require("../controller/rollController")
const rollRouter = express.Router();

rollRouter.route("/roll").post(rollDice)
rollRouter.route("/voucher-history").get(getVoucherHistory)
rollRouter.route("/prize-history").get(getPrizeHistory)
rollRouter.route("/dice-history").get(getDiceHistory)


module.exports = rollRouter;