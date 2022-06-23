const express = require ("express");
const {getAllCRUD,createCRUD,getCRUDByUserName,getCRUDById,updateCRUDById,deleteCRUDById} = require("../controller/prizeController")
const prizeRouter = express.Router();

prizeRouter.route("/").get(getAllCRUD).post(createCRUD)
prizeRouter.route("/:id").get(getCRUDById).put(updateCRUDById).delete(deleteCRUDById)

module.exports = prizeRouter;