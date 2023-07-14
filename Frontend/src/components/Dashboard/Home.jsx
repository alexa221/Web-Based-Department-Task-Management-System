import React from 'react'
import './home.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import Navigation from '../Navigation/Navigation'
import axios from 'axios';
const Home = () => {
       const [progress, setProgress] = useState(0);

  useEffect(() => {
    // simulate progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 70;
        }
        return prevProgress + 10;
      });
    }, 500);

    // cleanup
    return () => clearInterval(interval);
  }, []);
const[projects, setProjects] =useState([])
  const projectTitle= async()=>{
    const response = await axios.get("http://localhost:7000/api/users/projects");
   
    setProjects(response.data.projects);
  }
  useEffect(()=>{
  projectTitle();
  },[])
  return (
       
   <div>
   
      <Navigation path = '/home' title= "Home"></Navigation>
      <div className='main__container'>
          
          <div className="project-status">
               <div className="status-total">
                      <p>Done</p>
                       <span>10</span>                 
                </div>                      
               <div className="status-total">
                      <p>IN Progress</p>
                       <span>10</span>                 
                </div>                      
               <div className="status-total">
                      <p>Pending</p>
                       <span>10</span>                 
                </div>                      
                                 
          </div>
          <div className="project-content">
    
{projects.length > 0 && (
  projects.map((user) => (
    <Link to="/projects" key={user.id}>
      <div className='project-card'>
        <div className="project">  
          <h3 className="project-title">{user.projectName}</h3>                       
          <span className='deadline'>10 days left</span> 
        </div>
        <ProgressBar value={60} />
        <div className='group-member'>
          <div className="horizontal-line"></div>
          <p className='total-member'>+2</p>
        </div>
      </div>
    </Link>
  ))
)}

         </div>     
       </div>
   </div>
  )
}

export default Home
