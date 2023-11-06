import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URL = "http://localhost:3000";

function Settings(props) {
  const navigation = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleLogout() {
    navigation("/LogIn");
  }

  async function handleDeleteUser(){
    try {
      console.log(props.id)
      const response = await axios.delete(URL + "/user", {
        data: { id: props.id }, // Use the data property to send the id
      });
      
      if(response.status == 200){
        navigation("/");
      } 
    } catch (error) {
      console.log(error.message)
      
    }
   
  }

  return (
    <div className="dropdown">
      <button
        className="dropdown-toggle"
        onClick={toggleDropdown}
        aria-expanded={isDropdownOpen}
      >
        &#9776; {/* Hamburger icon */}
      </button>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          {/* <a className="dropdown-item" href="#option1">
            Option 1
          </a>
          <a className="dropdown-item" href="#option2">
            Option 2
          </a> */}
          <a className="dropdown-item" href="#logout" onClick={handleLogout}>
            Log Out
          </a>
          <a className="dropdown-item" href="#logout" onClick={handleDeleteUser}>
            Delete User
          </a>
        </div>
      )}
    </div>
  );
}

export default Settings;
