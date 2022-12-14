const express = require('express');
const router = express.Router();

//@get api/users, @access Public, @desc test route
router.get('/', (req, res) => res.send("get users"));

module.exports = router;