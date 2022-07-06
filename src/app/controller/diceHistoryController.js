const mongoose = require ("mongoose");
const diceHistory = require("../model/diceHistoryModel")
const baseController = require("./baseController")

class DiceHistoryController {
    getAll (req,res) {
        let user = req.query.user
        let condition = {}
    
        user ? condition.user = user : {};
        diceHistory.find(condition).populate([{path:"user",select : "userName -_id"},{path : "voucher",select : "maVoucher phanTramGiamGia -_id"},{path : "prize",select : "name -_id"}]).exec(baseController.get(req,res))
    }
    
    getById (req,res) {
        let id = req.params.id;
        // Kiẻm tra dữ liệu 
        if(!baseController.checkIdModel (id,res)) {return;}
        diceHistory.findById(id).select("-bonusPrize -createdAt -updatedAt").populate([{path : "voucher", select : "maVoucher phanTramGiamGia -_id"},{path : "prize",select : "name -_id"}]).exec(baseController.get(req,res));
    }
    
    create (req,res) {
        // B1 : thu thập data
        let id = req.params.userId;
        let body = req.body;
    
        //B2 : Verify data
    
        let data = {
            ...body
        }
        //B3 : Thực hiên nghiệp vụ
        diceHistory.create(data,baseController.post(req,res));
    }
    
    updateById (req,res) {
        let id = req.params.id;
    
        //Verify data
        // Kiểm tra id 
        if(!baseController.checkIdModel (id,res)) {return;}
        
        // Thu thập dữ liệu
        let body = req.body;
    
        // Kiểm tra vài dữ liệu
        diceHistory.findByIdAndUpdate(id,body,{new : true},baseController.get(req,res));
    }    
      
    
    deleteById (req,res) {
        let id = req.params.id;
    
        // Kiểm tra id 
        if(!baseController.checkIdModel (id,res)) {return;}
    
        // Delete
        diceHistory.findByIdAndDelete(id,baseController.delete(req,res));
    }
    
    deleteAll (req,res) {
        diceHistory.deleteMany().exec(baseController.delete(req,res))
    }
}

module.exports = new DiceHistoryController ()