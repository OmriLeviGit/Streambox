import React, { useState } from 'react';
import './Loginwrapper.css';
import Userfield from '../Userfield/Userfield';
import { Navigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Loginwrapper({users,setcurrentUser}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [move, setMove] = useState(false);
  const [goFeed, setgoFeed] = useState(false);

const handleSubmit = () => {
  for(let i=0; i<users.length; i++){
    if(users[i].username === username && users[i].password === password){
      setgoFeed(true);
      setcurrentUser(users[i]);
    }
  }
}

if(move){
  return (<Navigate to='/signup' />);
}
if(goFeed){
  return (<Navigate to='/feed' />);
}

  return (
    <div className='login-wrapper'>
      <div className='input-group'>
        <i className='bi bi-person-circle'></i>
        <Userfield label='Username' settext={setUsername} />
      </div>
      <div className='input-group'>
        <i className='bi bi-lock'></i>
        <Userfield label='Password' settext={setPassword} />
      </div>
      <div className='login-footer'>
        <p>Don't have an account? <button onClick={() => setMove(true)}>Register</button></p>
      </div>
      <button className='register-button' onClick={() => setgoFeed(true)}>Confirm</button>
    </div>
  );
}