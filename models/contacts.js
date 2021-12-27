const mongoose = require('mongoose');
const contactsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true,
        max: 255,
        min: 6
    },
    phone: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    dob: {
        type: Date,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    }
})
module.exports = mongoose.model('contacts', contactsSchema)