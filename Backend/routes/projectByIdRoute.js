
const express = require("express");
const router = express.Router();
const {getProjectById} = require("../controllers/projectById")
router.get('/projects/:id', getProjectById);
module.exports = router;