const mongoose = require ("mongoose");
const apiModel = require("../model/voucherModel")
const { baseGetController,basePostController,checkIdModel,baseDeleteController} = require("./baseController")

const getAllCRUD = (req,res) => {
    apiModel.find(baseGetController(req,res))
}

const getCRUDById = (req,res) => {
    let id = req.params.id;
    // Kiẻm tra dữ liệu 
    if(!checkIdModel (id,res)) {return;}
    apiModel.findById(id,baseGetController(req,res));   
}

const getCRUDRandom = (req,res) => {
    apiModel.findOneRandom(baseGetController(req,res))
}

const getCRUDRandoms = (req,res) => {
    apiModel.findRandom({$or : [{discount : 30},{discount:40}] },{},{limit : 10},baseGetController(req,res))
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

    // Delete
    apiModel.findByIdAndDelete(id,baseDeleteController(req,res));

}

const deleteAllCRUD = (req,res) => {
    apiModel.deleteMany(baseDeleteController(req,res));
}

module.exports = {getAllCRUD,getCRUDById,createCRUD,updateCRUDById,deleteCRUDById,deleteAllCRUD,getCRUDRandom,getCRUDRandoms}