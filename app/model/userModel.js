const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    _id : Schema.Types.ObjectId,
    userName : {
        type : String,
        lowercase : true,
        trim : true,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    createAt : {
        type : Date,
        default : Date.now()
    },
    updatedAt : {
        type : Date,
        default : Date.now()
    }
},{ versionKey: false })

userSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.createAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
}


userSchema.statics.findByUserName = function (value,cb) {
    return obj = this.find({userName : value},cb)
}

module.exports = mongoose.model("User",userSchema)