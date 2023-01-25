const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const generateToken = require('../helpers/jsonwebtoken');

const register = async (req, res) => {
    let { username, firstName, lastName, email, password } = req.body;

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                status: 400,
                message: 'There is already a user with this email.'
            });
        }

        const salt = bcryptjs.genSaltSync(10);
        password = bcryptjs.hashSync(password, salt);

        const user = await new User({ username, firstName, lastName, email, password });
        await user.save();

        res.status(200).json({
            status: 200,
            message: 'Account created.',
            body: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Server side error.'
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: 'The Email is not valid.'
            })
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid password.'
            })
        }

        const token = await generateToken(user.uid);

        res.status(200).json({
            status: 200,
            message: 'You are logged in.',
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Server side error.'
        })
    }
}

module.exports = {
    register,
    login
}