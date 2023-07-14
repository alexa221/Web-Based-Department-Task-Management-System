import React from 'react'
import { useState  } from 'react'
import swal from 'sweetalert'
import Swal from 'sweetalert2'
import './login.css'
const Login = () => {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[error, setError] = useState('');
         const validation = (e)=>{
          e.preventDefault();
          if(email.length == 0 || password.length == 0){
            setError(true);
          }
          if(email && password){
            login();
          }
         }
            async function login(){
            
              let item =    {email, password};
              const options = {
                method:"POST",
                headers:{"content-type": "application/json", Accept: "application/json", Authorization: `Bearer`},
                body: JSON.stringify(item)
              };
              const url = "http://localhost:7000/api/users/login";
              try {
                 const response = await fetch(url, options);
                 console.log(response);
                 if(response.ok){
                  console.log("Login successful");
                  swal("Successful", "Welcome To Admin DashBoard", "success", { buttons: false, timer: 2000, })
                  .then((value) => {
                  
                      localStorage.setItem("jwt", JSON.stringify("jwt"));
                      localStorage.getItem("jwt");
                      window.location.href = "/home";
                  })
          } else {
              swal.fire({
                  title: "Failed To Login?",
                  text: `Wrong Password or Username! `,
                  icon: 'error',
                
                  showConfirmButton: false,
                  showCancelButton: true,
                  cancelButtonColor: '#d33',
                  showClass: {
                      popup: 'animate__animated animate__shakeX'
                  },
              })
                  
                 }
                  
              } catch (error) {
                console.log(error + "error");
                Swal.fire({
                    title: "Something Went Wrong?",
                    text: `Invalid Username or Password `,
                    icon: "warning",
                    dangerMode: true, 
                    showConfirmButton: false,
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    showClass: {
                        popup: 'animate__animated animate__shakeX'
                    },
                })
              }
            }
  return (
   <div>
     <h1 className="header">Welcome To Department Level TMS</h1>
     <div className='login-container' >
       
      <form onSubmit={validation}>
      <div className="login-inputs-fields">
        
        <div className='signin'>
                 <p>Username</p>
                 <input type="email" name="phone" onChange={e=>setEmail(e.target.value)} placeholder='Enter your email'/>
                 {error && email.length <= 0 ? <span className="error">please enter your password</span> : ""}
           </div>
        <div className='signin'>
                 <p>Password</p>
                 <input type="password" name="password" onChange={e=>setPassword(e.target.value)} placeholder='Enter your password'/>
                 {error && password.length <= 0 ? <span className="error">please enter your password</span> : ""}
           </div>
           <button className="signbtn">SIGN IN</button>
        </div>
      </form>
</div>
   </div>
  )
}

export default Login
