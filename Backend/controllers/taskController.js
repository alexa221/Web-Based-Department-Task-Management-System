
const asyncHandler = require("express-async-handler");
const {Task, Project} = require("../models/");

const createTask = async(req, res)=>{
   try {
      const { taskName, taskDescription, dueDate, projectId } = req.body;

      // Find the project by projectId
      const project = await Project.findByPk(projectId);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }
       // Check if a task with the same dueDate already exists
       const existingTask = await Task.findOne({
         where: { dueDate, projectId }
       });
 
       if (existingTask) {
         return res.status(409).json({
           success: false,
           message: 'Task with the same due date already exists'
         });
       }
      // Create a new task associated with the project
      const newTask = await Task.create({
        taskName,
        taskDescription,
        dueDate,
        projectId
      });
      const taskResponse = {
        id: newTask.id,
        taskName: newTask.taskName,
        taskDescription: newTask.taskDescription,
        dueDate: newTask.dueDate,
        createdAt: newTask.createdAt,
        updatedAt: newTask.updatedAt
      };

      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        task: taskResponse
      })
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create task'
      });
    }
}
const getAllTasks = asyncHandler(async (req, res) => {
   try {
     const Tasks = await Task.findAll();
 
     // Send response with all projects data
     res.status(200).json({
       tasks: Tasks,
     });
   } catch (error) {
     // Handle errors and send error response
     console.log("Error occurred:", error);
     res.status(400).json({
       error: error.message,
       message: "Failed to fetch tasks",
     });
   }
 });
module.exports = {createTask,getAllTasks};
