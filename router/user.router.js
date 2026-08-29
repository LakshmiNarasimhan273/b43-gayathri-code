const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authz.middleware");
const authentication = require("../security/authentication.security");

router.post("/register", authentication.registerApi);
router.post("/login", authentication.loginApi);

router.use(authMiddleware);

router.get("/", userController.getallUser);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;