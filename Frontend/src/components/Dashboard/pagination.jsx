import React, { useState, useEffect } from 'react';
import { Pagination, Select } from 'antd';
import 'antd/dist/reset.css';
const { Option } = Select;
import './pagination.css'
function ProjectTable() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(0);


  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // number of items per page
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:7000/api/users/projects')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (typeof data === 'object') {
          const projectArray = Object.values(data);
          setData(projectArray);
        } else {
          throw new Error('Response data was not an object');
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProjects = data.slice(startIndex, endIndex);
  const totalProjects = data.length;
  const totalPages = Math.ceil(totalProjects / pageSize);

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
    
      <table className='project_table'>
        <thead>
          <tr>            <th>Project Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
            <th>Manager</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.map((project) => {
            if (!project) {
              console.warn('Project is undefined or null:', project);
              return null;
            }
            return (
              <tr key={project.id}>
                <td>{project.projectName}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>{project.desc}</td>
                <td>{project.manager}</td>
                <td>{project.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="page">
        <Pagination
          onChange={(page) => setCurrentPage(page)}
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
  );
};



export default ProjectTable;
