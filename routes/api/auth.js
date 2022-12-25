const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//@get api/auth, @access Public, @desc test route
router.get('/', auth, (req, res) => res.send("get auth"));

module.exports = router;