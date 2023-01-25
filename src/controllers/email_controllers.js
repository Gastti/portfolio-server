const Email = require('../models/email');

const newEmail = async (req, res) => {
    const { name, from, message } = req.body;
    const newEmail = new Email({ name, from, message });
    newEmail.save();
    res.status(200).json({
        status: 200,
        message: 'Email sent.',
        body: newEmail
    });
}

const listEmails = async (req, res) => {
    const { page } = req.query;

    const customLabels = {
        totalDocs: 'totalEmails',
        docs: 'emails',
        limit: 'perPage',
    };

    const options = {
        page,
        limit: 15,
        customLabels
    };

    try {
        const emails = await Email.paginate({ deleted: false }, options);
        res.status(200).json({
            status: 200,
            body: emails
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Server side error.'
        });
    }
}

const listDeletedEmails = async (req, res) => {
    try {
        const emails = await Email.find({ deleted: true });
        res.status(200).json({
            status: 200,
            body: emails
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Server side error.'
        });
    }
}

const deleteEmail = async (req, res) => {
    try {
        const { uid } = req.params;
        const email = await Email.findById(uid);
        if (!email || email.deleted == true) {
            return res.status(400).json({
                status: 400,
                message: "Email not found."
            });
        }

        email.deleted = true;
        await email.save();

        res.status(200).json({
            status: 200,
            message: 'The email has been deleted.',
            body: email
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Server side error.'
        });
    }
}

const restoreEmail = async (req, res) => {
    try {
        const { uid } = req.params;
        const email = await Email.findById(uid);
        if (!email || email.deleted == false) {
            return res.status(400).json({
                status: 400,
                message: "Email not found."
            });
        }
        email.deleted = false;
        await email.save();

        res.status(200).json({
            status: 200,
            message: 'The message has been restored.',
            body: email
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Server side error.'
        });
    }
}

module.exports = {
    newEmail,
    listEmails,
    listDeletedEmails,
    deleteEmail,
    restoreEmail
}