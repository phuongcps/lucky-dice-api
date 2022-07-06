const mongoose = require("mongoose")

class baseController {
    get (req,res) {
        return (err,data) => {
            err 
            ? res.status(500).json({
                message : err.message
            }) 
            : res.status(200).json(data)
        }
    }

    getRelated (req,res,nameProperty) {
        return (err,data) => {
            err 
            ? res.status(500).json({
                message : err.message
            }) 
            : res.status(200).json(data[nameProperty])
        }
    }

    post (req,res) {
        return (err,data) => {
            err ? 
            res.status(500).json({
                message : err.message
            }) : res.status(201).json(data)
        }
    }

    updateRelatedAfterPost (modelRelated,idModel,fieldUpdate,dataUpdate) {
        modelRelated.findByIdAndUpdate(idModel,{
            $push : {[fieldUpdate] : dataUpdate}
        }).exec()
    }

    delete (req,res) {
        return (err,data) => {
            err ? 
            res.status(500).json({
                message : err.message
            }) : res.status(204).send();
        }
    }

    deleleAllRelatedBeforeDelete (modalRelated,fieldId) {
        return (res,data) => {
            for (let each of data[fieldId]) {
                modalRelated.findByIdAndDelete(each).exec();
            }
        }
    }

    updateSingleObjectRelatedAfterDelete (model,field,id) {
        return model.updateMany({[field] : id},{
            $set : {[field] : null}
        }).exec();
    }
    
    updateArrayObjectRelatedAfterDelete (model,field,id) {
        return model.updateMany({[field] : id},{
            $pull : {[field] : id}
        }).exec();
    }
    
    
    checkIdModel (id,res) {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({message : "Id không hợp lệ . Hãy kiểm tra lại Id"})
            return false;  
        }
        return true
    }
    
}


module.exports = new baseController();
