const mongoose = require ("mongoose");
const apiModel = require("../model/diceHistoryModel")
const { baseGetController, baseDeleteController,checkIdModel } = require("./baseController")

const getAllCRUD = (req,res) => {
    let user = req.query.user
    let condition = {}

    user ? condition.user = user : {};
    apiModel.find(condition).populate([{path:"user",select : "userName -_id"},{path : "voucher",select : "maVoucher phanTramGiamGia -_id"},{path : "prize",select : "name -_id"}]).exec(baseGetController(req,res))
}

const getCRUDById = (req,res) => {
    let id = req.params.id;
    // Kiẻm tra dữ liệu 
    if(!checkIdModel (id,res)) {return;}
    apiModel.findById(id).select("-bonusPrize -createdAt -updatedAt").populate([{path : "voucher", select : "maVoucher phanTramGiamGia -_id"},{path : "prize",select : "name -_id"}]).exec(baseGetController(req,res));
}

const createCRUD = (req,res) => {
    // B1 : thu thập data
    let id = req.params.userId;
    let body = req.body;

    //B2 : Verify data

    let data = {
        _id : mongoose.Types.ObjectId(),
        ...body
    }
    //B3 : Thực hiên nghiệp vụ
    apiModel.create(data,basePostController(req,res));
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

    // Delete
    apiModel.findByIdAndDelete(id,baseDeleteController(req,res));
}

const deleteAllCRUD = (req,res) => {
    apiModel.deleteMany().exec(baseDeleteController(req,res))
}

module.exports = {getAllCRUD,createCRUD,deleteCRUDById,updateCRUDById,getCRUDById,deleteAllCRUD}