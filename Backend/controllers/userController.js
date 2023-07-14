const jwt = require('jsonwebtoken');  
const bcrypt = require("bcrypt");
const {Users, UsersRole} = require("../models");

const asyncHandler = require("express-async-handler");
const registerUser = async (req, res) => {
  const { id, firstName, lastName, email, password, role, confirmPassword, dept } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword || !dept) {
    return res.status(400).json({
      path: req.path,
      error: 'Please add all fields',
      message: 'All fields required',
      status: 400,
    });
  }

  try {
    // Check if user exists
    const userExists = await Users.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({
        message: 'User Already Exists',
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: 'Passwords do not match',
      });
    }

    // Find the user role
    const userRole = await UsersRole.findOne({ where: { role } });
    if (!userRole) {
      return res.status(400).json({
        message: 'Invalid role',
      });
    }

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const confirmHashedPassword = await bcrypt.hash(confirmPassword, salt);

    // Create user
    const user = await Users.create({
      id,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roleId: userRole.id,
      confirmPassword: confirmHashedPassword,
      dept,
    });

    if (user) {
      return res.status(201).json({
        token: generatedToken(user.id),
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role,
        dept: user.dept,
      });
    } else {
      return res.status(400).json({
        path: req.path,
        error: 'Please add all fields',
        message: 'All fields required',
        status: 400,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};



 const getTeachers = async(req, res)=>{
 try {
  const teachers = await Users.findAll({where:{roleId:4}});
  res.status(200).json({
   teachers
  });
 } catch (err) {
  console.log(err);
  res.status(500).json({ message: 'Server Error' });
 }
 }
 const getStudents = async(req, res)=>{
 try {
  const students = await Users.findAll({where:{roleId:5}});
  res.status(200).json({
   students
  });
 } catch (err) {
  console.log(err);
  res.status(500).json({ message: 'Server Error' });
 }
 }
const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;
            //check user
           const checkUser = await Users.findOne({where:{email}});
           const compareWith = await bcrypt.compare(password, checkUser.password);
           if(checkUser && compareWith ){
            res.status(201).json({
              token: generatedToken(checkUser.id),
             id:checkUser.id,
             username:checkUser.username,
             email:checkUser.email,
            });         
             
           }
           else{
            res.status(401).json({
              path:req.path,
              messege:"Invaild User Name or Password",
              status:401

            })
           
         }
})
            // Generate JWT
            const generatedToken = (id)=>{
                return jwt.sign({id}, `${process.env.JWT_SECRET}`, {expiresIn:"1d"});
            }

const getMe = asyncHandler(async(req,res)=>{
  const  listOfUser = await Users.findAll();
  res.json({
   listOfUser
  });
})
     
module.exports ={registerUser,loginUser, getMe, getTeachers,getStudents};

