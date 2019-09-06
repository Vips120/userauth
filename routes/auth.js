let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let Joi = require('@hapi/joi');
let User = require('../model/users');

router.post('/auth', async(req,res) => {
let {error} = ValidationError(req.body);
if(error) {return res.status(403).send(error.details[0].message)}
let user = await User.findOne({"UserLogin.email": req.body.UserLogin.email});
if(!user){return res.status(402).send('invalid email id or password')}
let userpassword = await bcrypt.compare(req.body.UserLogin.password,user.UserLogin.password);
if(!userpassword){return res.status(402).send('invalid email id or password')}
res.send(true);
});

function ValidationError(error){
    let Schema = Joi.object().keys({
        UserLogin:{
            email:Joi.string().required(),
            password: Joi.string().required().min(5).max(200)
        }
    });
    return Joi.validate(error,Schema);
};
module.exports = router;