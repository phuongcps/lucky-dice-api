const express = require ("express");
const User = require("../app/controller/userController")
const userRouter = express.Router();

userRouter.route("/").get(User.getAll).post(User.create)
userRouter.route("/id/:id").get(User.getById)
userRouter.route("/:id").put(User.updateById).delete(User.deleteById)
userRouter.get("/:userName",User.getByUserName)

module.exports = userRouter;