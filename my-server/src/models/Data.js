import { model, Schema, Types } from 'mongoose'

const dataSchema = new Schema({
    title: {
        type: String,
        
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
      
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
            type: Types.ObjectId,
            ref: 'User'
        }
    ],
    buyingList: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

let Data = model('Data', dataSchema)
export default Data