const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userID: {
        type: Number,
        min: 1,
        required: true
    },
    questionnaires: Array
});

module.exports = mongoose.model('User', userSchema);