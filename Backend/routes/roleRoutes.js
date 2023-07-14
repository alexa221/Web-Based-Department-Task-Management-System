const express = require("express");
const router = express.Router();
const {userRole, createUserRole} = require("../controllers/roleController")
router.post("/registerRole", createUserRole);
router.get("/role", userRole);
module.exports = router;