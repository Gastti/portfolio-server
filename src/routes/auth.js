const { Router } = require('express');
const { register, login } = require('../controllers/auth_controllers');
const { check } = require('express-validator');
const validate = require('../middlewares/validate-fields');
const router = new Router();

router.post('/register', [
    check('username')
        .notEmpty().withMessage('Required field')
        .isAlphanumeric().withMessage('It must be alphanumeric')
        .isLength({ min: 3 }).withMessage('It must contain at least 3 characters')
        .trim()
        .escape(),

    check('firstName')
        .notEmpty().withMessage('Required field')
        .isAlphanumeric().withMessage('It must be alphanumeric')
        .isLength({ min: 3 }).withMessage('It must contain at least 3 characters')
        .trim()
        .escape(),

    check('lastName')
        .notEmpty().withMessage('Required field')
        .isAlphanumeric().withMessage('It must be alphanumeric')
        .isLength({ min: 3 }).withMessage('It must contain at least 3 characters')
        .trim()
        .escape(),

    check('email')
        .notEmpty().withMessage('Required field')
        .isEmail().withMessage('It must be a valid email')
        .normalizeEmail()
        .trim()
        .escape(),

    check('password')
        .notEmpty().withMessage('Required field')
        .isLength({ min: 6 }).withMessage('Password must contain at least 6 characters')
        .matches('[0-9]').withMessage('Password must contain a number')
        .matches('[a-z]').withMessage('Password must contain an Lowercase letter')
        .matches('[A-Z]').withMessage('Password must contain an Uppercase letter')
        .trim()
        .escape(),

    validate
], register);

router.post('/login', [
    check('email')
        .notEmpty().withMessage('Required field')
        .isEmail().withMessage('It must be a valid email')
        .normalizeEmail()
        .trim()
        .escape(),

    check('password')
        .notEmpty().withMessage('Required field')
        .isLength({ min: 6 }).withMessage('Password must contain at least 6 characters')
        .trim()
        .escape(),

    validate
], login)

module.exports = router;