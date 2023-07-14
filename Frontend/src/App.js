
import Registration from "./components/Registration/Registration";
import Project from "./components/Project/ProjectRegistration";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Student from "./components/Student/Student";
import Teacher from "./components/Teacher/Teacher";
import Login from "./components/Login/Login";
import Home from "./components/Dashboard/Home";
import ProjectInfo from "./components/Project/ProjectInfo";
import ProjectDetail from "./components/Project/projectDetail";
function App() {
  return (
    <Router>
  
        <div >
          <Routes>
          <Route path="/projects" element={<ProjectInfo/>} />
        <Route path="/projects/:id" element={<ProjectDetail/>} />
            <Route path="/"  element = {<Login/>}></Route> 
          
            <Route path="/home"  element = {<Home/>}></Route> 
            <Route path="/registration" element = { <Registration/>}></Route>
            <Route path="/project" element = { <Project/>}></Route>
            <Route path="/student" element = { <Student/>}></Route>
            <Route path="/teacher" element = { <Teacher/>}></Route>
          </Routes>
        </div>
    </Router>
  );
}

export default App;
