const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const EmailSchema = Schema({
    name: {
        type: String,
        require: [true, 'Required field.']
    },
    from: {
        type: String,
        require: [true, 'Required field.']
    },
    message: {
        type: String,
        require: [true, 'Required field.']
    },
    readed: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    }
})

EmailSchema.plugin(mongoosePaginate);

EmailSchema.methods.toJSON = function () {
    const { __v, _id, ...email } = this.toObject();
    email.uid = _id;
    return email
}

module.exports = model('Email', EmailSchema);