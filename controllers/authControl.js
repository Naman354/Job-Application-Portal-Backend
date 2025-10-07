import User from "../model/structure.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});
}
const register = async (req, res) => {
    const {username, email, password} =req.body;
    try{
        const userExists = await User.findOne({email});
        
    }
}
