import React from 'react'
import { FaStarOfLife } from 'react-icons/fa';
import './Registration.css'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [nameError, setNameError] = useState(null);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(null);
  const [email,setEmail] = useState("");
  const [emailError,setEmailError] = useState(null);
  const [password,setPassword] = useState("");
  const [passwordError,setPasswordError] = useState(null);
  const [confirmPassword,setConfirmPassword] = useState("");
  const [confirmPasswordError,setConfirmPasswordError] = useState(null);
  const [dept, setDepartmentName] = useState("");
  const [departmentNameError, setDepartmentNameError] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  // create validate function
  const handleName = (event)=>{
    setFirstName(event.target.value);
    setNameError("");
  }
  const handleLastName = (event)=>{
    setLastName(event.target.value);
    setLastNameError("")
  }
  const handleEmail = (e)=>{
    setEmail(e.target.value);
    setEmailError("");
  }
  const handlePassword = (e)=>{
    setPassword(e.target.value)
    setPasswordError("");
  }
  const handleConfirmPassword = (e)=>{
    setConfirmPassword(e.target.value)
    setConfirmPasswordError("");
  }
  const handleDepartment = (e)=>{
    setDepartmentName(e.target.value)
    setDepartmentNameError("");
  }
  function handleRoleChange(event) {
    const selectedRole = event.target.value;
    console.log(selectedRole);
    setSelectedRole(selectedRole);
  }
  const handleSubmit =  async(event) => {
    event.preventDefault();
     if(!firstName){
          setNameError("Name is required.");
      }
    else if (firstName.length <= 3){
         setNameError("Name must be at least 3 characters.");
    }
   if(!lastName){
        setLastNameError("Last Name is required.");
   }
    else if (lastName.length <= 3){
        setLastNameError("Last Name must be at least 3 characters.");
    }

    if (!email) {
         setEmailError("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
           setEmailError("Invalid email address.");
    }
    if(!password){
        setPasswordError("Password is required.");
     }
     
      else if (password.length <= 8){
         setPasswordError("Password must be at least 8 characters.");
      }
      if(!confirmPassword){
         setConfirmPasswordError("Confirm password is required.");
      }
      else if (confirmPassword.length <= 8){
          setConfirmPasswordError("Confirm password must be at least 8 characters.");
      }
      if(!dept){
          setDepartmentNameError("Department is required.");
       }
        else if (dept.length <= 3){
           setDepartmentNameError("Department must be at least 3 characters.");
        }

if(firstName && lastName && email  && password && confirmPassword && selectedRole && dept){
  try {
    const response = await fetch("http://localhost:7000/api/users", {
       method: "POST",
       headers:{
        "Content-Type":"application/json",
       },
       body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        role: selectedRole,// Add selected role to the body object
        confirmPassword,
        dept,
       }),
       
    });
    const data = await response.json();
    console.log("Response data:", data);
    localStorage.setItem("message", JSON.stringify(data['message']));
   const message = localStorage.getItem('message')
    if(response.ok){
      console.log("Sign up successfully");
      Swal.fire({
        title: "Successful",
        text: `${message}`,
        icon: 'success',
        confirmButtonText: 'Cool'
      });
      setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setDepartmentName("");
          setSelectedRole("");
        } else {
        
          Swal.fire({
            text: `Failed To Register ${message}`,
            icon: "error",
            showDenyButton: true,
            denyButtonText: "Cancel",
            showConfirmButton: false,
            showClass: {
              popup: "animate__animated animate__shakeX",
            },
          });
        }
      
    

  } catch (error) {
    console.error("Error:", error);
        alert("Error registering user, please try again.");
  }
     
 
}
    
  };



  useEffect(() => {
    fetch('http://localhost:7000/api/users/role')
      .then(response => response.json())
      .then(data => setRoles(data))
      .catch(error => console.error(error));
  }, []);


  return (
    <form>
        <Navigation path = "/registration" title = " Registration"></Navigation>
       <div className='main-container'>
      
          <div className='inner'>
             <div className=" input-field-container inner">
             <div className='name'>
                    <p>Name  <FaStarOfLife style={{marginBottom:"2px"}}  size="0.5rem" color='red'></FaStarOfLife></p>
                    <input type="text" name="name"  onChange={handleName} value = {firstName} placeholder='Enter your Name'/>
                     {nameError && <div className='error'>{nameError}</div>}
              </div>
              <div className='name'>
                    <p>Last Name  <FaStarOfLife style={{marginBottom:"2px"}}  size="0.5rem" color='red'></FaStarOfLife></p>
                      <input type="text" name="name" onChange={handleLastName}  value={lastName
                        } placeholder='Enter your middle name'/>
                     {lastNameError && <div className='error'>{lastNameError}</div>}
              </div>
         
              <div className='name'>
                 <p>Email  <FaStarOfLife style={{marginBottom:"2px"}}  size="0.5rem" color='red'></FaStarOfLife></p>
                  <input type="text" name="name"  onChange = {handleEmail} value = {email} placeholder='Enter your email '/>
                  {emailError && <div className='error'>{emailError}</div>}
               </div>
               <div className='name'>
                    <p>Password  <FaStarOfLife style={{marginBottom:"2px"}}  size="0.5rem" color='red'></FaStarOfLife></p>
                     <input type="password" name="name"  onChange={handlePassword} value={password} placeholder='Enter your password'/>
                     {passwordError && <div className='error'>{passwordError}</div>}
                </div>
             <div className='name'>
                    <p>Your Role  <FaStarOfLife style={{marginBottom:"2px"}}  size="0.5rem" color='red'></FaStarOfLife></p>
                   <select style = {{marginLeft:"10px"}} value={selectedRole} onChange={handleRoleChange}>
                          <option value="">Select a role</option>
                          {roles.map(role => (
                          <option key={role.id} value={role.role}>{role.role}</option>
                              ))}
                    </select>
             </div>
                <div className='name'>
                     <p>Confirm Password  <FaStarOfLife style={{marginBottom:"2px"}}  size="0.5rem" color='red'></FaStarOfLife></p>
                      <input type="password" name="name"  onChange={handleConfirmPassword} value={confirmPassword} placeholder='Enter your password'/>
                      {confirmPasswordError && <div className='error'>{confirmPasswordError}</div>}
                 </div>
                 <div className='name'>
                 <p>Department Name  <FaStarOfLife style={{marginBottom:"2px"}}  size="0.5rem" color='red'></FaStarOfLife></p>
                 <input type="text" name="name" onChange={handleDepartment}  value={dept
                 } placeholder='Enter your department'/>
                 {departmentNameError && <div className='error'>{departmentNameError}</div>}
              </div>
                <div className='user-button'>
                       <button type = 'submit' className='add' onClick={handleSubmit}>Register</button>
                 </div>
             </div>
   
          </div>
    

        </div>
    </form>
  );
}

export default Registration
