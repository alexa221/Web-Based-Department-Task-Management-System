import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStarOfLife } from 'react-icons/fa';
import './projectDetail.css';
import Navigation from '../Navigation/Navigation';

const ProjectDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:7000/api/users/projects/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the data variable to the console
        setItem(data.project);
      });
  }, [id]);
  



 
  

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the item data to the API endpoint
   // console.log(item);
  };
  return (
    <div>
      <Navigation path={`/projects/${id}`} />
      <table>
  <thead>
    <tr>
      <th>Project Name</th>
      <th>Description</th>
      <th>Status</th>
      <th>Start Date</th>
    </tr>
  </thead>
  <tbody>
    {item && (
      <tr>
        <td>{item.projectName}</td>
        <td>{item.desc}</td>
        <td>{item.status}</td>
        <td>{item.startDate}</td>
      </tr>
    )}
  </tbody>
</table>



    </div>
  );
  
};

export default ProjectDetail;
