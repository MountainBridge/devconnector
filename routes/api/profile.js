const express = require('express');
const router = express.Router();

//@get api/profile, @access Public, @desc test route
router.get('/', (req, res) => res.send("received the request"));

module.exports = router;