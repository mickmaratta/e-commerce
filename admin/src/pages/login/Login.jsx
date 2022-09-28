import React from 'react';
import "./login.css"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/apiCalls';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const {currentUser} = useSelector((state)=>state.user);
const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(currentUser)
    login(dispatch, { username, password });
  }
 
  currentUser && navigate("/", {replace: true});
  
  return (
    <div className='login'>
        <input 
          type="text" 
          placeholder='username' 
          onChange={e=>setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder='password' 
          onChange={e=>setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login