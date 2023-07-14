const asyncHandler = require("express-async-handler");
const { Project } = require('../models');
const registerProject = asyncHandler(async (req, res) => {
  // Extract project data from request body
  const { projectName, desc, startDate, endDate, status, manager } = req.body;

  try {
    const requiredAttributes = ["projectName", "desc", "startDate", "endDate", "status", "manager"];

const missingAttribute = requiredAttributes.find((attribute) => {
  if (!req.body[attribute] && !req.query[attribute]) {
    return attribute;
  }
});

if (missingAttribute) {
  throw new Error(`Please add the ${missingAttribute} field`);
}

    // Check if all required fields are present
    if (!projectName || !desc || !startDate || !endDate || !status || !manager) {
      throw new Error("Please add all fields");
    }

    // Check if a project with the same start date already exists
    const existingProject = await Project.findOne({ where: { startDate } });
    if (existingProject) {
      throw new Error("Duplicate Project");
    }

    console.log("Creating a new Project...");
    // Create new Project
    const project = await Project.create({
      projectName,
      desc,
      startDate,
      endDate,
      status,
      manager,
    });

    // Send response with created project data
    res.status(201).json(project);
  } catch (error) {
    // Handle errors and send error response
    console.log("Error occurred:", error);
    res.status(400).json({
      error: error.message,
      message: "Project registration failed",
    });
  }
});

const getAllProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.findAll();

    // Send response with all projects data
    res.status(200).json({
      projects: projects,
    });
  } catch (error) {
    // Handle errors and send error response
    console.log("Error occurred:", error);
    res.status(400).json({
      error: error.message,
      message: "Failed to fetch projects",
    });
  }
});

module.exports = { registerProject, getAllProjects };
