import React from 'react';
import "./login.css"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/apiCalls';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const {currentUser, isFetching, error} = useSelector((state)=>state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = () => {
    login(dispatch, { username, password });
  }
  
  useEffect(() => {
    if (currentUser) {
      currentUser.isAdmin && navigate("/", { replace: true });
    }
  }, [currentUser, navigate])
  
  return (
    <div className='login'>
      <h1 className='loginTitle'>ADMIN LOGIN</h1>
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
        <button className="loginButton" onClick={handleLogin} disabled={isFetching}>Login</button>
        {error && <span className='loginError'>Wrong credentials</span> }
        <span className='mobileMessage'>Sorry, this admin panel is only available on desktop.</span>
    </div>
  )
}

export default Login