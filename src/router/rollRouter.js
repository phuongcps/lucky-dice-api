const express = require ("express");
const Roll = require("../app/controller/rollController")
const rollRouter = express.Router();

rollRouter.route("/roll").post(Roll.rollDice)
rollRouter.route("/voucher-history").get(Roll.getVoucherHistory)
rollRouter.route("/prize-history").get(Roll.getPrizeHistory)
rollRouter.route("/dice-history").get(Roll.getDiceHistory)


module.exports = rollRouter;