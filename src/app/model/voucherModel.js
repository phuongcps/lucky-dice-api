const mongoose = require("mongoose")
const Schema = mongoose.Schema
const random = require('mongoose-simple-random');
const uniqueValidator = require('mongoose-unique-validator');


const voucherSchema = new Schema ({
    //_id : Schema.Types.ObjectId, // Không có cũng được
    maVoucher: {
        type : String,
        required : [true,"Chưa nhập {PATH} - Mã giảm giá"],
        unique : true //Unique phải xài bộ thư viện bổ sung nếu muốn custom error
    },
    phanTramGiamGia : {
        type : Number,
        required : [true,"Chưa nhập {PATH} - Phần trăm giảm giá"],
        min : [1,"Phần trăm giảm giá phải lớn hơn 0 , {VALUE} là không phù hợp"],
        max : [99,"Phần trăm giảm giá phải nhỏ hơn 100 , {VALUE} là không phù hợp"],
        validate : {
            validator : (value) => Number.isInteger(value),
            message : '{PATH} phải là số nguyên,{VALUE} là không phù hợp'
        }
    },
    createdAt : Number,
    updatedAt : Number,
    note : {
        type : String,
        required : false,
    }
},{ versionKey: false, timestamps: true})

voucherSchema.plugin(random)
voucherSchema.plugin(uniqueValidator,{message: 'Lỗi, Giá trị {PATH} phải là unique, giá trị {VALUE} trùng với dữ liệu khác'})

voucherSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
}

module.exports = mongoose.model("Voucher",voucherSchema)