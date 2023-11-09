import React, {useState} from "react";
import TaskTable from "../../components/TaskTable/TaskTable";
import './CreateTable.css';
import { useNavigate } from 'react-router-dom';
import { useLocation} from "react-router-dom";
import Warnings from "../../components/Warnings/Warnings";
import axios from 'axios';
import Settings from "../../components/Settings/Settings";
import {startsBefore} from '../../helper_functions/helper_functions'

function CreateTable(){
    const URL = "http://localhost:3000";
    const startingNum = 5
    const initialRows = Array(startingNum).fill({ time: '', startTime: '', endTime: '', task: '', goal: '' });
    const [rows, setRows] = useState(initialRows);
    const [createButtonClicked, setCreateButtonClicked] = useState(false)
    const [dtWarning, setDtWarning] = useState(false)
    const navigation = useNavigate();
    const location = useLocation();
    const [showFilledWarning, setShowFilledWarning] = useState(false)
    const [showTimeWarning, setShowTimeWarning] = useState(false)
    const [showTimeWarning2, setShowTimeWarning2] = useState(false)
    const { username } = location.state || {};

    const handleDeleteRow = (index) => {
      if (rows.length > 1){
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
      }
      else{
        setDtWarning(true);
      }
      
    };

    function closeFilledWarning(){
      setShowFilledWarning(false)
    }

    function closeDeleteWarning(){
      setDtWarning(false)
    }

    function closeTimeWarning(){
      setShowTimeWarning(false)
    }

    function closeTimeWarning2(){
      setShowTimeWarning2(false)
    }
    async function handleCreateTable(){
      setCreateButtonClicked(true)
       var filled = true;
       var validTime = true;
       var recentTime = ""
       var validRange = true;
        rows.forEach((item) => {
          if (!item.startTime || !item.endTime || !item.task || !item.goal){
            setShowFilledWarning(true)
            filled = false
          }
          if(item.startTime && item.endTime && !startsBefore(item.startTime, item.endTime)){
            setShowTimeWarning(true)
            validRange = false;

          }
          if(item.startTime && (recentTime !== "" && !startsBefore(recentTime, item.startTime))){
            setShowTimeWarning2(true)
            validTime = false
          }
          if(item.endTime){
            recentTime = item.endTime;
          }
        })
        if(filled && validTime && validRange){
          // Make a POST request to your backend API
          try{
            
            // console.log(id)
            console.log("USERNAME IS" + username)
            const response = await axios.post(URL + "/tables", {username, rows}); 
            console.log(response.status)
            console.log('Response from the server:', response.data); 
            navigation("/schedule",  {
              state: {
                rows: rows,
                username: username
              },
            });

          }
          catch (error) {
            console.error('Error:', error);
          }
         
        }
        
    }
    return (
            <div>
             <Settings username = {username}/>
             <h1> Enter your Schedule Below </h1>
             <TaskTable rows={rows} setRows={setRows} handleDeleteRow = {handleDeleteRow} /> 
            <button onClick={handleCreateTable} className="createTableButton"> Create Time Table </button> 
            <Warnings 
             showFilledWarning = {showFilledWarning}
             createButtonClicked = {createButtonClicked}
             closeFilledWarning = {closeFilledWarning}
             dtWarning = {dtWarning}
             closeDeleteWarning = {closeDeleteWarning}
             closeTimeWarning = {closeTimeWarning}
             showTimeWarning = {showTimeWarning}
             closeTimeWarning2 = {closeTimeWarning2}
             showTimeWarning2 = {showTimeWarning2}
             />
            </div>
            );
}

export default CreateTable;