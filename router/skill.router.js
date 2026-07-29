const express = require("express");
const router = express.Router();        

const skillController = require("../controllers/skill.controller");
router.get("/", skillController.getallSkill);
router.get("/:id", skillController.getSkillById);
router.post("/", skillController.createSkill);
router.put("/:id", skillController.updateSkill);
router.delete("/:id", skillController.deleteSkill); 

module.exports = router;