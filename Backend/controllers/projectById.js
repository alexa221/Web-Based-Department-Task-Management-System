const { Project } = require("../models");
const getProjectById = async (req, res)=>{
    const projectId = parseInt(req.params.id);
    const project = await Project.findOne({where:{id:projectId}});
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      return res.json({ project });
}
module.exports = {getProjectById}