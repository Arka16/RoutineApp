import React from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation} from "react-router-dom";
import TaskTable from "../../components/TaskTable/TaskTable";
import { useState } from "react";
import Warnings from "../../components/Warnings/Warnings";
import Alert from "../../components/Alert/Alert";


import "./EditTable.css"

function EditTable(props){
    const location = useLocation();
    const navigation = useNavigate();
    const {rows} = location.state
    const [newRows, setNewRows] = useState(rows)
    const [dtWarning, setDtWarning] = useState(false)
    const [showFilledWarning, setShowFilledWarning] = useState(false)
    const [createButtonClicked, setCreateButtonClicked] = useState(false)
    const [backClicked, setBackClicked] = useState(false)
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
      

      function goBack() {
        window.alert("This is a simple alert!");
        setBackClicked(true);
        setTimeout(() => {
          navigation("/schedule", {
            state: {
              rows: rows,
            },
          });
        }, 1000); // Delay for 1 second (adjust as needed)
      }

      
      function closeFilledWarning(){
        setShowFilledWarning(false)
      }
  
      function closeDeleteWarning(){
        setDtWarning(false)
      }
      function handleCreateTable(){
        setCreateButtonClicked(true)
         var filled = true;
          newRows.forEach((item) => {
            if (!item.time || !item.task || !item.goal){
              setShowFilledWarning(true)
              filled = false
            }
          })
          if(filled){
            navigation("/schedule",  {
              state: {
                rows: newRows,
              },
            });
          }
          
      }

    return (
    <div>
    <h1> Edit Table </h1>
    {backClicked && <Alert/>}
    <TaskTable rows={newRows} setRows={setNewRows} handleDeleteRow = {handleDeleteRow} /> 
    <div className="botton-container">

    <button onClick={goBack} className="backButton"> Back </button> 
    <button onClick={handleCreateTable} className="createTableButton"> Create Time Table </button>     

    </div>
    
    <Warnings 
        showFilledWarning = {showFilledWarning}
        createButtonClicked = {createButtonClicked}
        closeFilledWarning = {closeFilledWarning}
        dtWarning = {dtWarning}
        closeDeleteWarning = {closeDeleteWarning}
        />
    </div>
    
    
    
    
    
    );
   
}

export default EditTable;