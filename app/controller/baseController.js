const mongoose = require("mongoose")

function baseGetController (req,res) {
    return (err,data) => {
        err 
        ? res.status(500).json({
            message : err.message
        }) 
        : res.status(200).json(data)
    }
}

function baseGetRelatedController (req,res,nameProperty) {
    return (err,data) => {
        err 
        ? res.status(500).json({
            message : err.message
        }) 
        : res.status(200).json(data[nameProperty])
    }
}

function basePostController (req,res) {
    return (err,data) => {
        err ? 
        res.status(500).json({
            message : err.message
        }) : res.status(201).json(data)
    }
}

function updateRelatedAfterPostController (modelRelated,idModel,fieldUpdate,dataUpdate) {
    modelRelated.findByIdAndUpdate(idModel,{
        $push : {[fieldUpdate] : dataUpdate}
    }).exec()
}

function baseDeleteController(req,res) {
    return (err,data) => {
        err ? 
        res.status(500).json({
            message : err.message
        }) : res.status(204).json(data)
    }
}

function deleleAllRelatedBeforeDelete (modalRelated,fieldId) {
    return (res,data) => {
        for (let each of data[fieldId]) {
            modalRelated.findByIdAndDelete(each).exec();
        }
    }
}

function updateSingleObjectRelatedAfterDelete (model,field,id) {
    return model.updateMany({[field] : id},{
        $set : {[field] : null}
    }).exec();
}

function updateArrayObjectRelatedAfterDelete (model,field,id) {
    return model.updateMany({[field] : id},{
        $pull : {[field] : id}
    }).exec();
}


function checkIdModel (id,res) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({message : "Id invalid"})
        return false;  
    }
    return true
}

module.exports = {baseGetController,basePostController,baseDeleteController,checkIdModel,baseGetRelatedController,updateSingleObjectRelatedAfterDelete,updateArrayObjectRelatedAfterDelete,deleleAllRelatedBeforeDelete,updateRelatedAfterPostController};
