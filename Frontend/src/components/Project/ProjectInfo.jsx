import React, { useState, useEffect} from 'react'

import './projectInfo.css'
import Navigation from '../Navigation/Navigation';
import 'animate.css';
import axios from 'axios'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import { Pagination } from 'antd';
const ProjectInfo = () => {
const[pop, setPop] = useState(false);
// const handleClickOpen = ()=>{
//   setPop(!pop);
// }
const closePopup = ()=>{
  setPop(false);
}
const [projects, setProjects] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(0);
const [totalProjects, setTotalProjects] = useState(0);
const [pageSize, setPageSize] = useState(5);



const fetchProjects = async () => {
  try {
    const response = await axios.get('http://localhost:7000/api/users/projects');
    setProjects(response.data.projects);
    setTotalPages(1);
    setTotalProjects(response.data.projects.length);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchProjects();
}, []);


const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
}


  return (
    <div >
   
   <Navigation  title="Project Detail" ></Navigation>
       <div className='main_content'>
           <div className='project_content'>
               <p>TOTAL PROJECTS</p>
                <div className="table_container">
                  <table className="project_table">
                      <thead>
                          <tr>
                              <th>Project Name</th>
                              <th>Description</th>
                              <th>Start Date</th>
                              <th>Deadline</th>
                              <th>Status</th>
                              <th>Manager</th>
                             
                              <th>Tasks</th>
                  
                          </tr>
                      </thead>
                      <tbody>
                         {
                      projects.map((pro)=>(
                        <tr className='active_row' key = {pro.id}>
                           <td>{pro.projectName}</td>
                           <td>{pro.desc}</td>
                           <td>{pro.startDate}</td>
                           <td>{pro.endDate}</td>
                           <td>{pro.status}</td>
                           <td>{pro.manager}</td>
                           <td>
                           <Link to={`/projects/${pro.id}`}>
  <button>Tasks</button>
</Link>

                            </td>
                         </tr>
                      ))
                         }
                      </tbody>
                  </table>
                </div>                  
           </div>
           <div className="page">
        <Pagination
          onChange={handlePageChange}
          pageSize={pageSize}
          current={currentPage}
          total={totalProjects}
          showQuickJumper
          showSizeChanger
          onShowSizeChange={(current, size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>
        </div>
        
    </div>
  )
}

export default ProjectInfo
