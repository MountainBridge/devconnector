const express = require('express');
const router = express.Router();

//@get api/auth, @access Public, @desc test route
router.get('/', (req, res) => res.send("get auth"));

module.exports = router;