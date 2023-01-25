const jwt = require('jsonwebtoken');
const config = require('../../config');

const generateToken = (id = '') => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, config.server.SECRET_KEY, {
            expiresIn: '30m'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Failed to create token.')
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = generateToken;