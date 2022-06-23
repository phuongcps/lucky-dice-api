const express = require ("express");
const {getAllCRUD,createCRUD,getCRUDById,updateCRUDById,deleteCRUDById,deleteAllCRUD,getCRUDRandom,getCRUDRandoms} = require("../controller/voucherController")
const voucherRouter = express.Router();

voucherRouter.route("/").get(getAllCRUD).post(createCRUD)
voucherRouter.route("/random").get(getCRUDRandom)
voucherRouter.route("/randoms").get(getCRUDRandoms)
voucherRouter.route("/all").delete(deleteAllCRUD)
voucherRouter.route("/:id").get(getCRUDById).put(updateCRUDById).delete(deleteCRUDById)

module.exports = voucherRouter;