// Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. 

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'thisisfortesting_only';
const User = require("../models/User");

// Creating middleware function
const fetchUser = (req, res, next) => {

    // Get the user from the jwt authtoken and add id to req object
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({error: "Please authenticate using valid token"});
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using valid token"});
    }
};

module.exports = fetchUser;