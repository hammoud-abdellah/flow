import { useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router";
import { useUser } from "../../context";
import {jwtDecode} from "jwt-decode"
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";

function Login() {
  const navigate=useNavigate();

  const {user,setUser}=useUser();

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false)

  async function submit(e){
    e.preventDefault();
    const res=await fetch('http://localhost:8080/users/login',{
      method:'POST',
      body:JSON.stringify({email,password}),
      headers:{'Content-Type':'application/json'},
      credentials:'include'
    })

    if(res.ok){
      const token=Cookies.get('jwt')
      if(token){
        const decoded=jwtDecode(token);
        setUser(prev=>{
          return {...prev,...decoded}
        });
      }
      setEmail('')
      setPassword('')
      setRedirect(true)
    }
    
  }
  if (redirect) {
    navigate('/projects')
  }


  return (
    <div className='login-page'>
        <h1 className='form-header1 text-6xl font-bold'>flow</h1>
        <h4 className='form-header4'>Managing team projects like never before.</h4>
        <div className='form-container'>
          <h1 className='form-header1 text-3xl pb-3 flex justify-center'>Login to your account </h1>
          <form onSubmit={submit}>
            <input
                    name='email'
                    className='form-input'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
            />
            <br />
            <input
                	  name='password'
                    className='form-input'                
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
            />
            <br />

            <button value="Login" className='form-button ml-auto mr-auto mt-1'>LogIn</button>
            <br/>
            <p>You don't have an account?<Link to="/signup" className='link text-blue'> Sign Up here</Link> </p>
          </form>
          </div>
      
      </div>
  );
}

export default Login;
