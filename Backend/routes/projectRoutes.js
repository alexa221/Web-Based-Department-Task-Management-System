const express = require("express");
const router = express.Router();
const {registerProject,getAllProjects} = require("../controllers/projectControlller")
 
router.post("/registerProject", registerProject);
router.get("/projects", getAllProjects);
module.exports = router;