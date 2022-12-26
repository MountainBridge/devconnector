const jwt = require('jsonwebtoken');
const config = require('config');

//middleware has access to req and res objects and next is the callback to the next piece of middleware
module.exports = function(req, res, next) {
    //get the token from the header
    const token = req.header('x-auth-token');

    //check if token exists
    if(!token){
        res.status(401).json({msg: 'No token, authorization denied'});
    }
    //verify token
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        console.log('user:', req.user);
    }catch(err){
        res.send.status(401).json({msg: 'token is invalid'});
    }
}