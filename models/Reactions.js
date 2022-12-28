const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const reactionsSchema = new Schema({
    reactionsId: {
        type: Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactionsBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
});

module.exports = reactionsSchema;