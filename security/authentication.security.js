const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerApi = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;
        const finalUsername = username || name;

        const emailCheck = await userModel.findOne({ email });

        if (emailCheck) {
            return res.status(400).json({ message: "User account exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username: finalUsername,
            email,
            password: hashedPassword,
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "User account creation failed" });
    }

};

const loginApi = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user){
            return res.status(404).json ({message: "User account not found"});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status (401).json({ message: "Invalid password"});
        }
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || process.env.jwt_secret,
            { expiresIn: "24h" }
        );

        res.status(200).json({ message: "Login Successful", token, user });

    } catch (error) {
        res.status(500).json({ message: "User login Failed" });
    }
};

module.exports = { registerApi, loginApi };