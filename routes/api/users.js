const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

//@post api/users, @access Public, @desc test route
router.post('/',
(req, res) => {
    console.log("request body", req.body);
    res.send("get users")});

module.exports = router;