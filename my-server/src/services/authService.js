import User from "../models/User.js";
import bcrypt from 'bcrypt'

export async function register(username, email, password, tel) {
    const existing = await User.findOne({ $or: [{ email }, { username }] });

    if (existing) {
        throw new Error('User already exists!')
    }    

    const user = await User.create({
        username,
        tel,
        email,
        password
    })
    return generateResponse
}

export async function login(email, password) {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Invalid user or password')
    };

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw new Error('Invalid user or password')
    }

    return generateResponse(user);
}

function generateResponse(user) {
    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = jwt.sign(payload, 'MYSECRET', { expiresIn: '2h' });

    return {
        _id: user._id,
        email: user.email,
        accessToken: token,
    };
}

//
/*app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
  
    // Simple validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Check if user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
  
    // Add user to "database"
    users.push({ name, email, password });
    res.status(201).json({ message: 'User registered successfully' });
  });*/