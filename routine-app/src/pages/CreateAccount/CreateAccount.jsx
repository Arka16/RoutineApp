import React, {useState} from "react";
import './CreateAccount.css'
import { useNavigate } from 'react-router-dom';

function CreateAccount(){

    const navigation = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
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
        <h1>Create Account </h1>
        <label htmlFor="Name">Name :</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email"> Enter Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="phoneNumber"> Enter Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
         <label htmlFor="username"> Create Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password"> Create Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         <label htmlFor="password"> Reenter Password:</label>
        <input
          type="password"
          id="password"
          value={repassword}
          onChange={(e) => setRepassword(e.target.value)}
        />
        <button className='CreateAccountButton' type="submit">Create Account</button>
        <button onClick = {()=> navigation("/LogIn")}> Already Logged in? Click here </button>
        <p className="message">{message}</p>
      </form>
    </div>
    )

}

export default CreateAccount