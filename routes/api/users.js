const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

//@post api/users, @access Public, @desc test route
//adding validations on the request received for users
router.post('/',
[   check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min:6})
],
(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    console.log("request body", req.body);
    res.send("get users")});

module.exports = router;