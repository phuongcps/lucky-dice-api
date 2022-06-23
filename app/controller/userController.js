const mongoose = require ("mongoose");
const apiModel = require("../model/userModel")
const diceHistoryModel = require("../model/diceHistoryModel")
const { baseGetController,basePostController,checkIdModel,baseDeleteController,deleleAllRelatedBeforeDelete} = require("./baseController")

const getAllCRUD = (req,res) => {
    apiModel.find(baseGetController(req,res))
}

const getCRUDById = (req,res) => {
    let id = req.params.id;
    // Kiẻm tra dữ liệu 
    if(!checkIdModel (id,res)) {return;}
    apiModel.findById(id,baseGetController(req,res));
    
}

const getCRUDByUserName = (req,res) => {
    let userName = req.params.userName
    apiModel.findOne({userName},"userName firstName lastName -_id",baseGetController(req,res));
}

const getCRUDByUserName1 = (req,res) => {
    let userName = req.params.userName
    apiModel.findByUserName(userName,baseGetController(req,res))
}

const createCRUD = (req,res) => {
    // B1 : thu thập data
    let body = req.body;

    //B2 : Verify data

    let course = {
        _id : mongoose.Types.ObjectId(),
        ...body
    }
    //B3 : Thực hiên nghiệp vụ
    apiModel.create(course,basePostController(req,res));

}

const updateCRUDById = (req,res) => {
    let id = req.params.id;

    //Verify data
    // Kiểm tra id 
    if(!checkIdModel (id,res)) {return;}
    
    // Thu thập dữ liệu
    let body = req.body;

    // Kiểm tra vài dữ liệu
    apiModel.findByIdAndUpdate(id,body,{new : true},baseGetController(req,res));
} 

const deleteCRUDById = (req,res) => {
    let id = req.params.id;

    // Kiểm tra id 
    if(!checkIdModel (id,res)) {return;}

    // Delete all Dice History of User
    diceHistoryModel.deleteMany({user : id}).exec()

    // Delete
    apiModel.findByIdAndDelete(id,baseDeleteController(req,res));

}

module.exports = {getAllCRUD,getCRUDById,createCRUD,getCRUDByUserName,updateCRUDById,deleteCRUDById,getCRUDByUserName1}