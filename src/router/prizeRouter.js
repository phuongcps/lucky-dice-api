const express = require ("express");
const Prize = require("../app/controller/prizeController")
const prizeRouter = express.Router();

prizeRouter.route("/").get(Prize.getAll).post(Prize.create)
prizeRouter.route("/:id").get(Prize.getById).put(Prize.updateById).delete(Prize.deleteById)

module.exports = prizeRouter;