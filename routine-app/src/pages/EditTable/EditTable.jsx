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

    const {data, id} = location.state | {}
    const [newRows, setNewRows] = useState(data)
    const [dtWarning, setDtWarning] = useState(false)
    const [showFilledWarning, setShowFilledWarning] = useState(false)
    const [createButtonClicked, setCreateButtonClicked] = useState(false)
    const [backClicked, setBackClicked] = useState(false)
    const URL = "http://localhost:3000"
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showTimeWarning, setShowTimeWarning] = useState(false)

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
              id:id
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

      async function  handleCreateTable(){
          setCreateButtonClicked(true)
          var filled = true;
          var validTime = true;
          var recentTime = ""
          newRows.forEach((item) => {
            if (!item.time || !item.task || !item.goal){
              setShowFilledWarning(true)
              filled = false
            }
            if(item.time && (recentTime !== "" && !startsBefore(recentTime, item.time))){
              setShowTimeWarning(true)
              validTime = false
            }
            if(item.time){
              recentTime = item.time;
            }
          })
          
          if(filled && validTime){
            console.log(id)
            console.log(newRows)
            const response = await axios.put(URL + "/table/" + id, {id, newRows});
            navigation("/schedule",  {
              state: {
                rows: newRows,
                id:id
              },
            });
          }
          
      }

    return (
    <div>
      <Settings id = {id}/>
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
        />
    </div>
    
    
    
    
    
    );
   
}

export default EditTable;