const express = require ("express");
const {getAllCRUD,createCRUD,getCRUDByUserName,getCRUDById,updateCRUDById,deleteCRUDById,getCRUDByUserName1} = require("../controller/userController")
const userRouter = express.Router();

userRouter.route("/").get(getAllCRUD).post(createCRUD)
userRouter.route("/:id").get(getCRUDById).put(updateCRUDById).delete(deleteCRUDById)
userRouter.get("/test/:userName",getCRUDByUserName)
userRouter.get("/test1/:userName",getCRUDByUserName1)

module.exports = userRouter;