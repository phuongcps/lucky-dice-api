const User = require("../model/userModel")
const diceHistoryModel = require("../model/diceHistoryModel")
const baseController = require("./baseController")

class UserController {
    getAll (req,res,next) {
        User.find(baseController.get(req,res))
    }
    
    getById (req,res) {
        let id = req.params.id;
        // Kiẻm tra dữ liệu 
        if(!baseController.checkIdModel(id,res)) {return;}
        User.findById(id,baseController.get(req,res));
    }
    
    getByUserName (req,res) {
        let userName = req.params.userName
        User.findOne({userName},"userName firstName lastName -_id",baseController.get(req,res));
    }
        
    create (req,res) {
        // B1 : thu thập data
        let body = req.body;
    
        //B2 : Verify data
    
        let course = {
            ...body
        }
        //B3 : Thực hiên nghiệp vụ
        User.create(course,baseController.post(req,res));
    }
    
    updateById (req,res) {
        let id = req.params.id;
    
        //Verify data
        // Kiểm tra id 
        if(!baseController.checkIdModel (id,res)) {return;}
        
        // Thu thập dữ liệu
        let body = req.body;
        console.log(body)
    
        // Kiểm tra vài dữ liệu
        User.findByIdAndUpdate(id,body,{new : true},baseController.get(req,res));
    } 
    
    deleteById(req,res) {
        let id = req.params.id;
    
        // Kiểm tra id 
        if(!baseController.checkIdModel(id,res)) {return;}
    
        // Delete all Dice History of User
        diceHistoryModel.deleteMany({user : id}).exec()
    
        // Delete
        User.findByIdAndDelete(id,baseController.delete(req,res));
    }
}


module.exports = new UserController();