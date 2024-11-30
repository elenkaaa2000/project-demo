const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const giftShema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
      
    },
    category: {
        type: String,
        required: true
    },
    delivery: {
        type: Number,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required!'],
        validate: /^https?:\/\//i,
    },
    likesList: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    buyingList: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    userId: {
        type: ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Gift', giftShema)