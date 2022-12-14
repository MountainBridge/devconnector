const express = require('express');
const router = express.Router();

//@get api/profile, @access Public, @desc test route
router.get('/', (req, res) => res.send("get profiles"));

module.exports = router;