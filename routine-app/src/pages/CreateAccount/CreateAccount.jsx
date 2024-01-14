import React, {useState} from "react";
import './CreateAccount.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {isValidPhoneNumber, isValidEmail} from '../../helper_functions/helper_functions'
function CreateAccount(){

    const navigation = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [message, setMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    const [phoneMessage, setPhoneMessage] = useState('')
    const URL = "http://localhost:3000";

    function handleRepeatChange(e){
      setRepassword(e.target.value)
      if(password && e.target.value && e.target.value !== password){
        setPasswordMessage("Passwords don't match!")
      }
      else{
        setPasswordMessage("")
      }
    }

    function handlePasswordChange(e){
      setPassword(e.target.value)
      if(repassword && e.target.value && e.target.value !== repassword){
        setPasswordMessage("Passwords don't match!")
      }
      else{
        setPasswordMessage("")
      }
     
     
    }

    function handleEmailChange(e){
      setEmail(e.target.value)
      if (e.target.value && !isValidEmail(e.target.value)){
        setEmailMessage("Invalid Email")
      }
      else{
        setEmailMessage("")
        
      }
     
     
    }

    function handlePhoneNumberChange(e){
      setPhoneNumber(e.target.value)
      if(e.target.value && !isValidPhoneNumber(e.target.value)){
        setPhoneMessage("Invalid Phone Number")
      }
      else{
        setPhoneMessage("")
       
      }
    }

    async function handleLogin(e) {
      e.preventDefault();
      //const response = await axios.post(URL + "/user/login", {username, password})
      
      if(!name || !username || !password || !email || !phoneNumber || !repassword){
        setMessage("Not all entries filled")
      }
      else if(password !== repassword){
        setPasswordMessage("Passwords don't match!")
      }
      else if(!isValidEmail(email)){
        setEmailMessage("Invalid Email")
      }
      else if(!isValidPhoneNumber(phoneNumber)){
        setPhoneMessage("Invalid Phone Number")
      }
      // else if(response.data['message1']){
      //   setMessage(response.data['message1'])
      // }
      
      else{

      
        try{
        
          const data = {
              name: name,
              username: username,
              password: password,
              email: email,
              phoneNumber: phoneNumber,
          }
          // const response = await axios.post(URL + "/user", data); 
          const response = await axios.post(URL + "/user/register", data); 
          console.log(response.status)
          console.log('Response from the server:', response.data);
          navigation("/createTable", {
              state: {
                  username: username
                },
          });

        }
        catch(error){
          console.log(error)
        }
      }
      
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
          onChange={handleEmailChange}
        />
         <p className="message"> {emailMessage} </p>
        <label htmlFor="phoneNumber"> Enter Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
         <p className="message"> {phoneMessage} </p>
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
          onChange={handlePasswordChange}
        />
         <label htmlFor="password"> Reenter Password:</label>
        <input
          type="password"
          id="password"
          value={repassword}
          onChange={handleRepeatChange}
        />
        <p className="message"> {passwordMessage} </p>
        <button className='CreateAccountButton' type="submit">Create Account</button>
        <a onClick = {()=> navigation("/LogIn")}> Already Registered? Click here </a>
        <p className="message">{message}</p>
      </form>
    </div>
    )

}

export default CreateAccount