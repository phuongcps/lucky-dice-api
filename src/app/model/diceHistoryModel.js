const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diceHistorySchema = new Schema ({
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
    createdAt : Number,
    updatedAt : Number
},{ versionKey: false , timestamps : true })

module.exports = mongoose.model("DiceHistory",diceHistorySchema)