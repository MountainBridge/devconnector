const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

//@get api/auth, @access Public, @desc test route
router.get('/', auth, async (req, res) =>{
try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
}catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
}
});

//@post api/users, @access Public, @desc authenticate a user and get the token
//adding validations on the request received for users
router.post('/',
[   
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try{
    //request to the db, see if user exists
    let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({errors: [{msg:"Invalid credentials"}]});
    }

     //compare the passwords
     const isMatch = await bcrypt.compare(password, user.password);

     if(!isMatch){
         return res.status(400).json({errors: [{msg:"Invalid credentials"}]});
     } 

    //return jsonwebtoken
    const payload = {
        user: {
            id: user.id
        }
    }
   
    //signing the token and sending it back
    jwt.sign(
        payload, 
        config.get('jwtSecret'),
        {expiresIn:360000},
        (err, token) => {
            if(err) throw err;
            res.json({token})
        }
        );

    } catch(err){
        console.log(err.message);
        res.status(500).send('Server error');
    }
});
module.exports = router;