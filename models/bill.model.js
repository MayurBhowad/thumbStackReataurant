const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billDetails = Schema({
    billNumber: {
        type: Number,
    },
    customerName: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    foodList: [{
        foodTag: {
            type: String,
            require: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
            require: true
        }
    }],
    tip: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Bill = mongoose.model('bills', billDetails);