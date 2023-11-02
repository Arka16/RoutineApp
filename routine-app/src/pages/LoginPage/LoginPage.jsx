import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigation = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    
    // You can add your authentication logic here.
    // For this example, let's consider a simple username and password.
    
    if (username === 'demo' && password === 'password') {
      setMessage('Login successful');
    } else {
      setMessage('Invalid username or password');
    }
    navigation("/createTable");
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
