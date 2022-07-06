const mongoose = require("mongoose")
const Schema = mongoose.Schema
// Để chạy gõ  npm install mongoose-simple-random
const random = require('mongoose-simple-random'); 
// Để chạy gõ  npm install mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');


const prizeSchema = new Schema ({
    name : {
        type : String,
        required : [true,"Chưa nhập tên phần thuỏng"],
        unique : true,
    },
    description : {
        type : String,
        required : false
    },
    createdAt : Number,
    updatedAt : Number
},{ versionKey: false, timestamps: true })

prizeSchema.plugin(random);
prizeSchema.plugin(uniqueValidator,{message: 'Lỗi, Giá trị {PATH} phải là unique, giá trị {VALUE} trùng với dữ liệu khác'})

module.exports = mongoose.model("Prize",prizeSchema)