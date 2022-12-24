const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

//@post api/users, @access Public, @desc test route
router.post('/', 
[
    check(name, 'Name is required').not().isEmpty(),
    check(email, 'Please include a valid email').isEmail(),
    check(password, 'Please enter a password with 6 or more characters').isLength({min:6})
],
(req, res) => {
    console.log("request body", req.body);
    res.send("get users")});

module.exports = router;