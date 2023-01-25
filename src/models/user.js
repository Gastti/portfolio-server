const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    username: {
        type: String,
        require: [true, 'Required field.']
    },
    firstName: {
        type: String,
        require: [true, 'Required field.']
    },
    lastName: {
        type: String,
        require: [true, 'Required field.']
    },
    email: {
        type: String,
        require: [true, 'Required field.']
    },
    password: {
        type: String,
        require: [true, 'Required field.']
    }
})

UserSchema.methods.toJSON = function () {
    const { __v, _id, password, ...user } = this.toObject();
    user.uid = _id;
    return user
}

module.exports = model('User', UserSchema);