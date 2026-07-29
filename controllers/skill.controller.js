const Skill = require("../models/skill.model");

const getallSkill = async (req, res) => {
    try {
        const skills = await Skill.find().populate("user","username email");
        res.status(200).json(skills);

    } catch (error) {
      res.status(500).json({ message:"Error please try after sometime"})  
    }
    
};

const getSkillById = async (req, res) => {
    try {
        const skillId = req.params.id;  
        const foundSkill = await Skill.findById(skillId).populate("user","username email");
        if (!foundSkill) {
            return res.status(404).json({ message: "Skill not found" });
        }
        res.status(200).json(foundSkill);
    } catch (error) {
        res.status(500).json({ message: "Error please try after sometime" });
    }
};

const createSkill = async (req, res) => {
  try {
    const newSkill = new Skill(req.body);
    await newSkill.save();

    res.status(201).json({
      message: "Skill created successfully",
      skill: newSkill,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSkill = async (req, res) => {
  try {
    const skillId = req.params.id;
    const updatedSkill = await Skill.findByIdAndUpdate(skillId, req.body, { new: true });

    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skillId = req.params.id;
    const deletedSkill = await Skill.findByIdAndDelete(skillId);    
    if (!deletedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getallSkill, getSkillById, createSkill, updateSkill, deleteSkill };