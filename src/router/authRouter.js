const express = require ("express");
const auth = require("../app/controller/authController")
const authRouter = express.Router();

authRouter.use(express.static('src/public'))
authRouter.route("/login").get(auth.loginPage).post(auth.login())
authRouter.route("/register").get(auth.signupPage).post(auth.signup())
authRouter.route("/forget").get(auth.forgetPage).post(auth.forget())
authRouter.route("/logout").get(auth.logout)

module.exports = authRouter;