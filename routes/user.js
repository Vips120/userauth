let express = require('express');
let router = express.Router();
let Joi = require('@hapi/joi');
let User = require('../model/users');
let bcrypt = require('bcrypt');
//new user registration
router.get('/' , (req,res) => {
    res.send('hello user');
})
router.post('/newuser', async(req,res) => {
 let {error} = ValidationError(req.body);
 if(error){return res.status(402).send(error.details[0].message)};
 let user = await User.findOne({"UserLogin.email":req.body.UserLogin.email})
 if(user) {return res.status(400).send('email id already in the system')}
 let data = new User({
     username:req.body.username,
     UserLogin:req.body.UserLogin
 });
 let salt = await bcrypt.genSalt(10);
 data.UserLogin.password = await bcrypt.hash(req.body.UserLogin.password,salt);

 let items = await data.save();
 res.send(items);
});

//Joi validation

function ValidationError(message){
    let Schema = Joi.object().keys({
        username:Joi.string().required().min(5).max(50),
        UserLogin:{
            email:Joi.string().required(),
            password: Joi.string().required().min(5).max(200)
        }
    });
    return Joi.validate(message,Schema);
};

module.exports = router;