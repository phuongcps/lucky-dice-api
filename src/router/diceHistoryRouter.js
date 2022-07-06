const express = require ("express");
const diceHistory = require("../app/controller/diceHistoryController")
const diceHistoryRouter = express.Router();

diceHistoryRouter.route("/").get(diceHistory.getAll).post(diceHistory.create)
diceHistoryRouter.route("/all").delete(diceHistory.deleteAll)
diceHistoryRouter.route("/:id").get(diceHistory.getById).put(diceHistory.updateById).delete(diceHistory.deleteById)

module.exports = diceHistoryRouter;