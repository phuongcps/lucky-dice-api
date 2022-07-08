// config/passport.js
// load các module
const passport = require('passport');
// load  user model
const User = require('../../app/model/userModel');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const bcrypt = require('bcrypt')

function setup (app) {
  
  // passport session setup
  app.use(passport.initialize())
  app.use(passport.session());
  app.use(flash());

  // used to serialize the user for the session
  passport.serializeUser(function(user, done){
    done(null, user.id);
  })

  // used to deserialize the user
  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    })
  })

  // local sign-up
  passport.use('local.signup',new LocalStrategy({
    usernameField:'userName',
    passwordField:'password',
    passReqToCallback:true
  },function(req, userName, password,done) {
  
  User.findOne({ userName }, function(err, user) {
        if (err) { return done(err); }
        if (user) {
          return done(null, false, { message : 'Username is already in use.'})
        }
      var newUser= new User();
      newUser.userName= userName;
      newUser.password=newUser.encryptPassword(password);
      newUser.save(function(err, result){
        if(err){
          return done(err)
        }
        return done(null, newUser);
      })
      });
    }
  ));

  // local sign-in
  passport.use('local.signin',new LocalStrategy({
    usernameField:'userName',
    passwordField:'password',
    passReqToCallback:true
  },function(req, userName, password,done) {

  User.findOne({userName}, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message : 'Không tìm thấy User'})
      }
      if(!bcrypt.compareSync(password, user.password)){
      
          return done(null,false,{message:'Sai mật khẩu'})
      }
        return done(null, user);
    
    });
  }
  ));

}

module.exports = setup;