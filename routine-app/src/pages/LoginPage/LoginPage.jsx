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

  const URL = "http://localhost:3000"
  
  const fetchData = async () => {
    try{
      const response = await axios.get(URL + "/get-user/" + username);
      console.log("RES")
      console.log(response.data.id)
      if (response){
        if (response.status === 200){
          setUserExists(true);
          setId(response.data.id)
        }     
        else{
          setUserExists(false);

        }
           
      }
      
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  } )
  const handleLogin = (e) => {
    e.preventDefault();
    
    // You can add your authentication logic here.
    // For this example, let's consider a simple username and password.
    
    if (username === 'demo' && password === 'password') {
      setMessage('Login successful');
    } else {
      setMessage('Invalid username or password');
    }
    if(userExists){
      navigation("/schedule", {
        state: {
          id: id
        },
    });

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
        <p className="message">{message}</p>
      </form>
    </div>
  );
}

export default LoginPage;
