import User from "../model/structure.js";
import jwt from "jsonwebtoken";

export const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});
}
export const register = async (req, res) => {
    const {username, email, role, password} =req.body;
    try{
        const userExists = await User.findOne({email});
        if (userExists) return res.status(400).json({message: "User already exists"});

        const user = await User.create({ username, email, role, password });
        res.status(201).json({
            _id: user.id,
            username: user.username,
            role: user.role,
            email: user.email,
        });
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if (user && await (user.matchPassword(password))) {
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user.id)
            });
        } else {
            res.status(401).json({ message: "Invalid email or password"});
        }
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

