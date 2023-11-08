import React, {  useEffect, useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function LoginPage() {
  const navigation = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [id, setId] = useState('')
  const [userExists, setUserExists] = useState(false)
  const [correctPassword, setCorrectPassword] = useState(false)
  const URL = "http://localhost:3000"
  
  const fetchData = async () => {
    try{
      const response = await axios.get(URL + "/get-user/" + username, {
        params: { password: password }});
      console.log("RES")
      console.log(response.data.id)
      console.log("RES STATUS")
      console.log(response.status)
      if (response){
        if (response.status === 200){
          setUserExists(true);
          setCorrectPassword(true);
          // setId(response.data.id)
        }     
        else{
          setUserExists(false);
          setCorrectPassword(false);
        }
           
      }
      
    }
    catch(error){
      console.log(error)
    }
  }

  // useEffect(() => {
  //   fetchData();
  // } )
  const handleLogin = async (e) => {
    e.preventDefault();
    
    const response = await axios.post(URL + "/user/login", {username, password})
    if(response.data.username){
      navigation("/schedule", {
        state: {
          username: username
        },
    });

    }

    else {
      setMessage(response.data.message);
    }
   
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='LoginButton' type="submit">Login</button>
        <a onClick = {()=> navigation("/")}> Not registered? Click here to Create a new account </a>
        <p className="message">{message}</p>
      </form>
    </div>
  );
}

export default LoginPage;
