const mongoose = require("mongoose")
var  passport = require('passport')
const { check, validationResult } = require('express-validator');
const User = require('../model/userModel')
const flash = require('connect-flash');
const bcrypt = require('bcrypt')


class AuthController {
    loginPage (req,res) {
        if (req.session.passport?.user) {
            res.redirect('/')
        } else {
            var messages = req.flash('error')
            var success = req.flash('success')

            res.render("auth/login.hbs",{
                messages: messages,
                hasErrors: messages.length > 0,
                success,
                hasSuccess : success.length >0
            })
        }
    }

    login () {
        return passport.authenticate('local.signin', { successRedirect: '/',
                                  failureRedirect: '/auth/login',
                                  badRequestMessage : 'Lỗi thiếu dữ liệu',
                                  failureFlash: true })
    }

    signupPage (req,res) {
        res.render("auth/register")
    }

    signup () {
        return [
            check('userName').custom(async userName => {
                return await User.findOne({userName}).then(user => {
                  if (user) {
                    return Promise.reject('Username đã được sử dụng');
                  }
                });
            }),
            check('firstName',"Firstname không bỏ trống")
                .notEmpty(),
            check('lastName',"Lastname không bỏ trống")
                .notEmpty(),
            check('password',"Mật khẩu phải có ít nhất 5 ký tự")
                .isLength({ min: 5 })
                .matches(/\d/)
                .withMessage('Mật khẩu phải có ít nhất 1 số'),
            check('passwordConfirmation').custom((value,{req}) => {
                if (value !== req.body.password) {
                    throw new Error('Xác nhận mật khẩu phải trùng khớp với mật khẩu');
                } else {
                    return true
                }
            }),
            (req, res, next) => {
                var messages = req.flash('error');
                const result= validationResult(req);
                var errors=result.errors;
                if (!result.isEmpty()) {
                  var messages = [];
                  errors.forEach(function(error){
                      messages.push(error.msg);
                  });
                  res.render('auth/register',{
                    messages: messages,
                    hasErrors: messages.length > 0,
                  });
                } else {

                    let data = {...req.body};

                    delete data.passwordConfirmation;
                    data.password = bcrypt.hashSync(data.password,bcrypt.genSaltSync(5),null);

                    User.create(data)
                        .then(data => {
                            req.flash('success','Đâng ký thành công. Bạn có thể đăng nhập tại đây')
                            res.redirect('/auth/login')
                        })
                        .catch(err => console.log(err))
                }
            }
        ]
    }

    logout (req,res,next) {
        req.logout(err => {
            if (err) {
                return next(err)
            } else {
                req.flash('success',' Log out success')
                res.redirect("/auth/login")
            }
        });
    }

    forgetPage (req,res) {
        res.render("auth/forget")
    }

    forget (req,res) {
        return [
            check('userName').custom(async userName => {
                return await User.findOne({userName}).then(user => {
                  if (!user) {
                    return Promise.reject('Không tìm thấy Username tương ứng');
                  }
                });
            }),
            check('password',"Mật khẩu phải có ít nhất 5 ký tự")
                .isLength({ min: 5 })
                .matches(/\d/)
                .withMessage('Mật khẩu phải có ít nhất 1 số'),
            check('passwordConfirmation').custom((value,{req}) => {
                if (value !== req.body.password) {
                    throw new Error('Xác nhận mật khẩu phải trùng khớp với mật khẩu');
                } else {
                    return true
                }
            }),
            (req, res, next) => {
                var messages = req.flash('error');
                const result= validationResult(req);
                var errors=result.errors;
                if (!result.isEmpty()) {
                  var messages = [];
                  errors.forEach(function(error){
                      messages.push(error.msg);
                  });
                  res.render('auth/forget',{
                    messages: messages,
                    hasErrors: messages.length > 0,
                  });
                } else {
                    const password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(5),null);
                    User.findOneAndUpdate({userName : req.body.userName},{password})
                        .then(value => {
                            req.flash('success',"Đổi mật khẩu thành công")
                            res.redirect("/auth/login")
                        })
                        .catch(err => console.log(err))
                    ;
                }
            }
        ]
    }
}

module.exports = new AuthController();
