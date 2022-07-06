const Prize = require("../model/prizeModel")
const baseController = require("./baseController")

class PrizeController {
    getAll (req,res) {
        Prize.find(baseController.get(req,res))
    }
    
    getById (req,res) {
        let id = req.params.id;
        // Kiẻm tra dữ liệu 
        if(!baseController.checkIdModel (id,res)) {return;}
        Prize.findById(id,baseController.get(req,res));
        
    }
    
    create (req,res) {
        // B1 : thu thập data
        let body = req.body;
    
        //B2 : Verify data
    
        let course = {
            ...body
        }
        //B3 : Thực hiên nghiệp vụ
        Prize.create(course,baseController.post(req,res));
    
    }
    
    updateById (req,res) {
        let id = req.params.id;
    
        //Verify data
        // Kiểm tra id 
        if(!baseController.checkIdModel (id,res)) {return;}
        
        // Thu thập dữ liệu
        let body = req.body;
    
        // Kiểm tra vài dữ liệu
        Prize.findByIdAndUpdate(id,body,{new : true},baseController.get(req,res));
    } 
    
    deleteById (req,res) {
        let id = req.params.id;
    
        // Kiểm tra id 
        if(!baseController.checkIdModel (id,res)) {return;}
    
        // Delete
        Prize.findByIdAndDelete(id,baseController.delete(req,res));
    
    }
}



module.exports = new PrizeController;