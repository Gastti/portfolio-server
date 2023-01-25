const { Router } = require('express');
const { check } = require('express-validator');
const { newEmail, listEmails, deleteEmail, listDeletedEmails, restoreEmail } = require('../controllers/email_controllers');
const isAuth = require('../middlewares/isAuth');
const validate = require('../middlewares/validate-fields');
const router = new Router();

router.post('/new', [
    check('name')
        .notEmpty().withMessage('Required field')
        // .isAlphanumeric().withMessage('It must be alphanumeric')
        .matches('^[a-zA-Z\u00C0-\u00FF]*$').withMessage('It must be alphanumeric.')
        .isLength({ min: 3 }).withMessage('Name must contain at least 3 characters')
        .trim()
        .escape(),

    check('from')
        .notEmpty().withMessage('Required field')
        .isEmail().withMessage('It must be a valid email')
        .normalizeEmail()
        .trim()
        .escape(),

    check('message')
        .notEmpty().withMessage('Required field')
        .isLength({ min: 3 }).withMessage('Message must contain at least 3 characters')
        .trim()
        .escape(),

    validate
], newEmail);

router.get('/inbox', [
    isAuth,
    validate
], listEmails);

router.get('/inbox/deleted', [
    isAuth,
    validate
], listDeletedEmails);

router.delete('/delete/:uid', [
    isAuth,
    validate
], deleteEmail);

router.post('/restore/:uid', [
    isAuth,
    validate
], restoreEmail);

module.exports = router;