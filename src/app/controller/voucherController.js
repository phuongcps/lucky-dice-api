const mongoose = require ("mongoose");
const Voucher = require("../model/voucherModel")
const baseController = require("./baseController")
const diceHistoryModel = require("../model/diceHistoryModel")

class VoucherController {

    getAll (req,res,next) {
        Voucher.find(baseController.get(req,res))
    }

    getById (req,res) {
        let id = req.params.id;
        // Kiẻm tra dữ liệu 
        if(!baseController.checkIdModel (id,res)) {return;}
        Voucher.findById(id,baseController.get(req,res));   
    }

    getRandom (req,res,next) {
        Voucher.findOneRandom(baseController.get(req,res))
    }

    getRandomByValue (req,res,next) {
        let discount = req.params.value;
        Voucher.findRandom({phanTramGiamGia : discount},baseController.get(req,res))
    }

    create (req,res,next) {
        const formData = {...req.body};
        Voucher.create({ ...formData },baseController.post(req,res))
    }

    updateById (req,res,next) {
        let id = req.params.id;

        //Verify data
        // Kiểm tra id 
        if(!baseController.checkIdModel(id,res)) {return;}
        
        // Thu thập dữ liệu
        let body = req.body;
    
        // Kiểm tra vài dữ liệu
        Voucher.findByIdAndUpdate(id,body,{new : true},baseController.get(req,res));
    }

    deleteById (req,res) {
        let id = req.params.id;
    
        // Kiểm tra id 
        if(!baseController.checkIdModel (id,res)) {return;}

        // Loại thông tin voucher ra khỏi các Result tương ứng
        baseController.updateSingleObjectRelatedAfterDelete(diceHistoryModel,"voucher",id)
    
        // Delete
        Voucher.findByIdAndDelete(id,baseController.delete(req,res));
    
    }
    
    deleteAll (req,res) {
        Voucher.deleteMany(baseController.delete(req,res));
    }
}



module.exports = new VoucherController()