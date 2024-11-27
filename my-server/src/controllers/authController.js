import { Router } from "express";
import { register, login } from "../services/authService.js";
import { getErrorMessage } from '../utils/errorHandling.js'

const authController = Router()

authController.post('/register', async (req, res) => {
    const { username, email, tel, password } = req.body;

    const result = await register(username, email, tel, password);
    res.json(result);
});

authController.get('/logout',  (req, res) => {
    res.clearCookie('token');
   res.status(204).end()
});



authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const result = await login(email,password);
    res.json(result)
})

export default authController