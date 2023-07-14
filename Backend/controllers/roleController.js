const {UsersRole} = require("../models");
const createUserRole = async (req, res) => {
  // Validate request
  if (!req.body.role) {
    res.status(400).send({ message: 'Role cannot be empty' });
    return;
  }

  // Create a UsersRole
  const usersRole = {
    role: req.body.role,
  };

  // Save UsersRole in the database
  try {
    const data = await UsersRole.create(usersRole);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the UsersRole.',
    });
  }
};

// Retrieve all UsersRoles from the database.
const userRole = async (req, res) => {
  try {
    const roles = await UsersRole.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    return res.status(500).send('An error occurred while retrieving distinct user roles');
  }
};

module.exports = { userRole, createUserRole };
