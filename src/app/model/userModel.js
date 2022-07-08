const mongoose = require("mongoose");
var bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
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
    password : {
        type : String,
        required : true,
    },
    createdAt : Number,
    updatedAt : Number,
},{ versionKey: false,timestamps :true })

userSchema.methods.toJSON = function() {
    let obj = this.toObject();
    return obj;
}

userSchema.methods.encryptPassword= function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null);
};

userSchema.statics.encryptPassword= function(){
    return bcrypt.hashSync(this.password, bcrypt.genSaltSync(5),null);
};

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

userSchema.statics.findByUserName = function (value,cb) {
    return obj = this.find({userName : value},cb)
}

module.exports = mongoose.model("User",userSchema)