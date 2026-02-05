import { userModel } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/auth.middleware.js";


export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ Message: "Invalid credentials" });

    const match = bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ Message: "Invalid credentials" });

    const token = generateToken(user);
    res.status(200).json({ Payload: token });
}

export const loginGoogle = async (req, res) => {
    try {
        req.session.user = {
            email: req.user.email,
            nombre: req.user.nombre,
            apellido: req.user.apellido,
            avatar: req.user.avatar,
            rol: req.user.user
        }
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ Message: "Server connection error" });
    }
}

export const register = async (req, res) => {
    const { email, password } = req.body;
    const exists = await userModel.findOne({ email });

    if (exists) return res.status(400).json({ Message: "User already registered" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userModel.create({ email, password: hash });

    res.status(201).json({ Message: "User created", Payload: user });
}

export const isLogged = (req, res, next) => {
    req.user ? next() : res.status(401).json({ Message: "Unauthorized" });
}