const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerApi = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }

        const emailCheck = await userModel.findOne({ email });

        if (emailCheck) {
            return res.status(400).json({ message: "User account exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
        });

        const jwtSecret = process.env.JWT_SECRET || process.env.jwt_secret || 'skillswap_dev_secret';

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            jwtSecret,
            { expiresIn: "6h" }
        );

        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({ message: "User created", token, user: userResponse });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: "User account creation failed", error: error.message });
    }

};

const loginApi = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email });
        
        if (!user){
            return res.status(404).json ({message: "User account not found"});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status (401).json({ message: "Invalid password"});
        }

        const jwtSecret = process.env.JWT_SECRET || process.env.jwt_secret || 'skillswap_dev_secret';

        const token = jwt.sign(
            { id: user._id, email: user.email },
            jwtSecret,
            { expiresIn: "6h" }
        );

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({ message: "Login Successful", token, user: userResponse });

    } catch (error) {
        res.status(500).json({ message: "User login Failed" });
    }
};

module.exports = { registerApi, loginApi };