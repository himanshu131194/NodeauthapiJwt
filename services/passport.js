const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const jwtOptions = {
  jwtFromRequest : ExtractJwt.fromHeader('authorization'),
  secretOrKey : config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, async function(payload, done){
    const user = await User.findById(payload.sub);
    if(user){
       return done(null , user)
    }
    return done(user, null);
});


const localOptions = { usernameField : 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
      User.findOne({email: email}, function(err, user){
          if(err)
             return done(err, null);
           if(!user){
            return done(null, false);
          }else{
             return done(null, user)
          }
      })
});


passport.use(jwtLogin);
