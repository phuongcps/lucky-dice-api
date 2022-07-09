const mongoose = require ("mongoose");
const voucherModel = require("../model/voucherModel")
const prizeModel = require("../model/prizeModel")
const userModel = require("../model/userModel")
const apiModel = require("../model/diceHistoryModel");
const diceHistoryModel = require("../model/diceHistoryModel");

class RollController {
    async rollDice (req,res) {

        function getRandomRoll () {
            return Math.floor(Math.random() * 6 + 1)
        }
        
        function getRandomVoucher (value) {
            return new Promise ((response,rej) => voucherModel.findRandom({phanTramGiamGia : (10*value > 50 ? 50 : 10*value)},"maVoucher phanTramGiamGia",{limit:1},(err,result) => response(result)))
        }
        
        function getRandomPrize () {
            return new Promise ((response,rej) => prizeModel.findOneRandom((err,result) => response(result)))
        }
        
        let user = req.body;
    
        if (!user.userName) {
            return res.status(400).json({
                message : "Chưa có userName"
            })
        }
    
        let userResult = {};
    
        await new Promise ((success,failed) => {userModel.findOne({userName : user.userName}).exec((err,data) => {
            if (data === null) {
                failed()
            } else {
                success(data)
            }
        })})
            .then ((value) => userResult = value)
            .catch(() => {
                res.status(400).json({
                    message : "User không tồn tại trong hệ thống"
                })
                return;
                }
            )
    
        let diceResult = getRandomRoll();
        let voucherResult = null;
        let prizeResult;
        let bonusPrize;
    
        if (diceResult <= 3) {
            voucherResult = null;
            bonusPrize = 0;
        } else {
            await apiModel.find({user : userResult._id}).sort({_id:"desc"}).limit(1).exec().then((data) => {
                bonusPrize = data.length != 0 ? ++ data[0].bonusPrize : 1;
            })
            await getRandomVoucher(bonusPrize).then(value => voucherResult = value[0]);
        }
    
        bonusPrize >= 3 ? await getRandomPrize().then(value => prizeResult = value) : prizeResult = null;
    
        let diceHistoryData = {
            user : userResult._id,
            dice : diceResult,
            voucher : voucherResult ? voucherResult._id : null,
            prize : prizeResult ? prizeResult._id : null,
            bonusPrize
        }
    
        apiModel.create(diceHistoryData)
            .then(value => {
                let result = {
                    id : value._id,
                    dice : diceResult,
                    voucher : diceResult <= 3 ? null : {
                        maVoucher: voucherResult.maVoucher,
                        phanTramGiamGia : voucherResult.phanTramGiamGia
                    },
                    prize : prizeResult ? prizeResult.name : null
                }
                res.status(201).json(result);
            }) 
    }
    
    async getDiceHistory (req,res) {
        let userName = req.query.userName
    
        if (!userName) {res.status(500).send("Chưa có userName")}
    
        let userId;
        await userModel.findOne({userName}).exec().then(value => userId = value)
    
        diceHistoryModel.find({user : userId}).exec((err,data) => {
            res.status(200).json({
                dices: data.map(each => {return {
                    dice : each.dice,
                    id : each._id
                }})
            })
        })
    }
    
    getVoucherHistory = async (req,res) => {
        let userName = req.query.userName
    
        if (!userName) {res.status(500).send("Chưa có userName")}
    
        let userId;
        await userModel.findOne({userName}).exec().then(value => userId = value)
    
        diceHistoryModel.find({user : userId,voucher : {$ne : null}}).select("voucher _id").populate("voucher","maVoucher phanTramGiamGia -_id").exec((err,data) => {
            res.status(200).json({
                vouchers : data.map(each => {return {
                        id: each._id,
                        voucher : each.voucher
                    }
                })
            })
        })
    }
    
    async getPrizeHistory (req,res) {
        let userName = req.query.userName
    
        if (!userName) {res.status(500).send("Chưa có userName")}
    
        let userId;
        await userModel.findOne({userName}).exec().then(value => userId = value)
    
        diceHistoryModel.find({user : userId,prize : {$ne : null}}).populate("prize","-_id").exec((err,data) => {
            res.status(200).json({
                prizes: data.map(each => { return {
                        id :each._id,
                        prize : each.prize.name
                    }
                })
            })
        })
    }
}


module.exports = new RollController();