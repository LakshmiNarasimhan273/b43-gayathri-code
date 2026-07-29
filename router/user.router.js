const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authz.middleware");
const authentication = require("../security/authentication.security");

router.get("/", authMiddleware, userController.getallUser);
router.post("/", authMiddleware, userController.createUser);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.post("/register", authentication.registerApi);
router.post("/login", authentication.loginApi);

module.exports = router;