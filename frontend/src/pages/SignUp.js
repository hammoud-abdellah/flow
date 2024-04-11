import { useState } from "react";
// import "./Login.css"
import { useNavigate } from "react-router";
import { useUser } from "../context";
import {jwtDecode} from "jwt-decode"
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";

function SignUp() {
  const navigate=useNavigate();

  const {user,setUser}=useUser();

  const[name, setName] = useState("");
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false)

  async function submit(e){
    e.preventDefault();
    const res=await fetch('http://localhost:8080/users/register',{
      method:'POST',
      body:JSON.stringify({name,email,password}),
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
    navigate('/login')
  }


  return (
    <div className='login-page flex justify-center p-6'>
        <h1 className='form-header1 text-6xl font-bold'>flow</h1>
        <div className='form-container'>
          <h1 className='form-header1 text-3xl pb-3 flex justify-center'>Create new account</h1>
          <form onSubmit={submit}>
           <input
                    name='name'
                    className='form-input'
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                    required
            />
            <br />
            <input
                    name='email'
                    className='form-input'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    required
            />
            <br />
            <input
                	name='password'
                    className='form-input'                
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    required
            />
            <br />

            <button type="submit" value="Signup" className='form-button ml-auto mr-auto mt-1 bg-white'>Sign Up</button>
            <br/>
            <p>You Already have an account? <Link to="/login" className='link text-blue'> Log In here</Link> </p>
          </form>
          </div>
      </div>
  );
}

export default SignUp;
