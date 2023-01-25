const config = require('../../config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const isAuth = async (req, res, next) => {
    try {
        let token = req.header('Authorization');
        if (!token) {
            return res.status(400).json({
                status: 400,
                message: 'Token not provided.'
            })
        }

        token = token.split(' ')[1]
        const { uid } = jwt.verify(token, config.server.SECRET_KEY);
        req.userAuth = await User.findOne({ uid });

        if (!req.userAuth) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid Token.'
            })
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            status: 401,
            message: 'Bad request. (token)'
        })
    }
}

module.exports = isAuth;