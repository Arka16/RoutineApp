import React from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation} from "react-router-dom";
import TaskTable from "../../components/TaskTable/TaskTable";
import { useState } from "react";
import Warnings from "../../components/Warnings/Warnings";
import Alert from "../../components/Alert/Alert";
import axios from "axios";
import Settings from "../../components/Settings/Settings";
import {startsBefore} from '../../helper_functions/helper_functions'

import "./EditTable.css"

function EditTable(props){
    const location = useLocation();
    const navigation = useNavigate();

    const {data, username} = location.state || {}
    console.log("DATA IN EDIT IS ")
    console.log(location.state)
    const [newRows, setNewRows] = useState(data)
    const [dtWarning, setDtWarning] = useState(false)
    const [showFilledWarning, setShowFilledWarning] = useState(false)
    const [createButtonClicked, setCreateButtonClicked] = useState(false)
    const [backClicked, setBackClicked] = useState(false)
    const URL = "http://localhost:3000"
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showTimeWarning, setShowTimeWarning] = useState(false)
    const [showTimeWarning2, setShowTimeWarning2] = useState(false)

    const handleDeleteRow = (index) => {
        if (newRows.length > 1){
          const updatedRows = [...newRows];
          updatedRows.splice(index, 1);
          setNewRows(updatedRows);
        }
        else{
          setDtWarning(true);
        }
        
      };

      const handleCancel = () => {
        setIsDialogOpen(false); // Close the dialog
      };
    
      const handleOK = () => {
        setIsDialogOpen(false); 
        navigation("/schedule", {
            state: {
              rows: data,
              username:username
            },
          });
      };
    
      const showCustomDialog = () => {
        setIsDialogOpen(true);
      };
      

      function goBack() {
          setBackClicked(true)
          setIsDialogOpen(true)
           
      
      }

      
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

      async function  handleCreateTable(){
          setCreateButtonClicked(true)
          var filled = true;
          var validTime = true;
          var recentTime = ""
          var validRange = true;
          newRows.forEach((item) => {
            if (!item.startTime || !item.endTime ||  !item.task || !item.goal){
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
            console.log(newRows)
            const response = await axios.put(URL + "/tables", {username, newRows});
            navigation("/schedule",  {
              state: {
                rows: newRows,
                username:username
              },
            });
          }
          
      }

    return (
    <div>
      <Settings username = {username}/>
    <h1> Edit Table </h1>
    {backClicked && isDialogOpen && <Alert 
          message="Warning: Your changes won't be saved. Are you sure you want to go back?"
          onCancel={handleCancel}
          onOK={handleOK}
          />}
   <TaskTable rows={newRows} setRows={setNewRows} handleDeleteRow = {handleDeleteRow} /> 
    <div className="botton-container">

    <button onClick={goBack} className="backButton"> Back </button> 
    <button onClick={handleCreateTable} className="finishEditButton"> Finish Editing </button>     

    </div>
    
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

export default EditTable;