const express = require("express");
const router = express.Router();        

const skillController = require("../controllers/skill.controller");
const authMiddleware = require("../middleware/authz.middleware");

router.get("/", skillController.getallSkill);
router.get("/:id", skillController.getSkillById);
router.use(authMiddleware);

router.post("/", skillController.createSkill);
router.put("/:id", skillController.updateSkill);
router.delete("/:id", skillController.deleteSkill); 

module.exports = router; 