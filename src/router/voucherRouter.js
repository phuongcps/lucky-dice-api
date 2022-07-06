const express = require ("express");
const Voucher = require("../app/controller/voucherController")
const voucherRouter = express.Router();

voucherRouter.route("/").get(Voucher.getAll).post(Voucher.create)
voucherRouter.route("/random").get(Voucher.getRandom)
voucherRouter.route("/random/:value").get(Voucher.getRandomByValue)
voucherRouter.route("/all").delete(Voucher.deleteAll)
voucherRouter.route("/:id").get(Voucher.getById).put(Voucher.updateById).delete(Voucher.deleteById)

module.exports = voucherRouter;