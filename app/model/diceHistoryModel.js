const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diceHistorySchema = new Schema ({
    _id : Schema.Types.ObjectId,
    user : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    dice : {
        type : Number,
        required : true
    },
    voucher : {
        type : Schema.Types.ObjectId,
        ref : "Voucher"
    },
    prize : {
        type : Schema.Types.ObjectId,
        ref : "Prize"
    },
    bonusPrize : {
        type : Number,
        default : 0
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

module.exports = mongoose.model("DiceHistory",diceHistorySchema)