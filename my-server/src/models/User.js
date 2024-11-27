import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [5, 'Username must be at least 2 characters'],
       
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email must be at least 10 characters']
    },
    tel: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength:[4, 'Password must be at least 4 characters']
    }
}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})

const User = model('User', userSchema)

export default User