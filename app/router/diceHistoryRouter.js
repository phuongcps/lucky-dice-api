const express = require ("express");
const {getAllCRUD,createCRUD,deleteCRUDById,getCRUDById,updateCRUDById,deleteAllCRUD} = require("../controller/diceHistoryController")
const diceHistoryRouter = express.Router();

diceHistoryRouter.route("/").get(getAllCRUD).post(createCRUD)
diceHistoryRouter.route("/all").delete(deleteAllCRUD)
diceHistoryRouter.route("/:id").get(getCRUDById).put(updateCRUDById).delete(deleteCRUDById)

module.exports = diceHistoryRouter;