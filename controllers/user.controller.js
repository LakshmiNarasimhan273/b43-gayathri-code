const userModel = require("../models/user.model");

const getallUser = async (req, res) => {
    try {
        const users = await userModel.find().sort({_id: -1});
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({message:"Server error,please try again after sometime"});
    }
};

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await userModel.create({ username, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Server error, please try again after sometime" });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: Access denied" });
        }
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "User updated", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error, please try after sometimes" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if(!user) {
            return res.status (401).json ({ message: "Unauthorized: Access Denied"});
        }
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User detail deleted"});
    } catch (error) {
        res.status(500).json({ message: "Server error, please try after sometimes"});
    }
    
};

module.exports = { getallUser, createUser, updateUser, deleteUser};

  