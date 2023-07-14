import React from 'react'
import { FaStarOfLife } from 'react-icons/fa';
import './project.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import Swal from 'sweetalert2'
import swal from "sweetalert";
import Multiselect from 'multiselect-react-dropdown';

import { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
const Project = () => {

  const [project,setProject] = useState([]);
  const [desc,setDesc] = useState([]);
  const [start,setStart] = useState([]);
  const [end,setEnd] = useState([]);
  const[manager,setManager]=useState([]);
  const [status,setStatus] = useState([]);

  const handleSubmit = (data)=>{
    console.log(data);
    data.preventDefault();
    addProject();
  }
  const addProject = async()=>{
    let items = {
      projectName: project,
      desc,
      startDate: start,
      endDate: end,
      status,
      manager: selectedTeacher,
    };
    
             let options= {
              method:"POST",
              headers:{
                'Content-Type':"application/json",
                'accept':"application/json"
              },
              body:JSON.stringify(items),
            };
            const url = "http://localhost:7000/api/users/registerProject"
            try {
             const response = await fetch(url, options); 
             const result = await response.json();
             console.log(result);
             localStorage.setItem("message", JSON.stringify(result['message']));
             const mess =localStorage.getItem("message");
             if(response.ok){
                 console.log("project add successfully");
                 swal("Successful",`$mess`,"success",
                {
                  button:false,
                  timer:2000
                }

                 );
                 setProject("");
                 setStart("");
                 setEnd("");
                 setDesc("");
                 setManager("");
                 setStatus("");

             }
             else{
              console.log("failed");
              swal(`Failed To Register ${mess}`, "Error", "error");
             }
            } catch (error) {
              console.error(error);
            }
  }
  const handleProject = (event)=>{
    setProject(event.target.value);
  }
  const handleStatus = (event)=>{
    setStatus(event.target.value);
  
  }
  const handleStart = (e)=>{
    setStart(e.target.value);
   
  }
  const handleEnd = (e)=>{
    setEnd(e.target.value)
 
  }
  const handleDesc = (e)=>{
    setDesc(e.target.value)
   
  }

  
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState([]);
  const [filterManager, setfilterMnager] = useState([]);

  const [selectedValue, setSelectedValue] = useState([]);

 


  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState('');
  const handleTeacherChange = (event) => {
    console.log('handleTeacherChange called');
    setSelectedTeacher(event.target.value);
    console.log('Selected teacher:', event.target.value); // Check the selected teacher value immediately after setting it
  };
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/users/teachers');
        setTeachers(response.data.teachers);
        console.log('Teachers:', response.data.teachers);
      } catch (error) {
        console.log('Error fetching teachers:', error);
      }
    };
  
    fetchTeachers();
  }, []);
  
  useEffect(() => {
    console.log('selectedTeacher:', selectedTeacher); // Check the selected teacher value whenever it changes
  }, [selectedTeacher]);
  
  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get('http://localhost:7000/api/users/students');
      setStudents(response.data.students);
    };
    fetchStudents();
  }, []);



  const onSelect = (selectedList, selectedItem) => {
    setSelectedStudents(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    setSelectedStudents(selectedList);
  }
 
  console.log('Rendered');

  
  const options1 = filterManager.map(user => ({
    value: user.id,
    label: user.firstName
    }));
  const options = filteredUsers.map(user => ({
    value: user.id,
    label: user.firstName
    }));

    const [popup, setPop] = useState(false);
    const handleClickopen = (e) => {
    e.preventDefault();
        setPop(!popup);
    }
    const closePopup = () => {
      setPop(false);
  }
       
  return (
    <form onSubmit={handleSubmit}>
        <Navigation path = "/Project" title = " Project"></Navigation>
       <div className='main-container'>
       
          <div className='inner'>
             <div className=" input-field-container inner">
             <div className='name'>
                    <p>Project Name  <FaStarOfLife style={{marginBottom:"2px"}}  size="0.5rem" color='red'></FaStarOfLife></p>
                    <input type="text" name="name"  onChange={handleProject} value = {project} placeholder='Enter project name'/>
                  
              </div>
            
                  
              <div className='name'>
                 <p>Start Date  <FaStarOfLife style={{marginBottom:"2px"}}  size="0.5rem" color='red'></FaStarOfLife></p>
                  <input type="date" name="date"  onChange = {handleStart} value = {start} placeholder='Enter Start Date '/>
             
               </div>
               <div className='name'>
                    <p>End Date  <FaStarOfLife style={{marginBottom:"2px"}}  size="0.5rem" color='red'></FaStarOfLife></p>
                     <input type="date" name="name"  onChange={handleEnd} value={end} placeholder='Enter your password'/>
                 
                </div>
                
               
                 <div className='name'>
                 <p>Project  Description  <FaStarOfLife style={{marginBottom:"2px"}}  size="0.5rem" color='red'></FaStarOfLife></p>
                 <input type="text" name="name" onChange={handleDesc}  value={desc
                 } placeholder='Enter your project description'/>
              
              </div>
                 <div className='name'>
                 <p>Status  <FaStarOfLife style={{marginBottom:"2px"}}  size="0.5rem" color='red'></FaStarOfLife></p>
                 <input type="text" name="name" onChange={handleStatus}  value={status
                 } placeholder='Enter your project status'/>
              
              </div>
             
              <div className="name">
    <p>Manager <FaStarOfLife style={{ marginBottom: "2px" }} size="0.5rem" color="red" /></p>
    <select value={selectedTeacher} onChange={handleTeacherChange}>
      <option value="">Select a manager</option>
      {teachers.map((teacher) => (
        <option key={teacher.id} value={`${teacher.firstName} ${teacher.lastName}`}>
          {teacher.firstName} {teacher.lastName}
        </option>
      ))}
    </select>
  </div>                             
                <div className='user-button'>
                 <button type = 'submit' className='add' >Register</button>
                 </div>                   
             </div>
          </div>
    

        </div>
    </form>
  );
}

export default Project
