const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');


function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}


exports.signup = async (req ,res, next)=>{
    const email = req.body.email;
    const password = req.body.password;
    //return res.json(req.body);
    const exist = await User.findOne({ email: email });
    if(exist){
       return res.status(403).send({ message: "account already exist" });
    }
    const user = new User({
        email : email,
        password : password
    });
    user.save((err)=>{
         if(err)
            return next(err);
    })
    res.json({token: tokenForUser(user)});
}
