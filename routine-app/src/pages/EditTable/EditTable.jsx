import React from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation} from "react-router-dom";
import TaskTable from "../../components/TaskTable/TaskTable";
import { useState } from "react";
import Warnings from "../../components/Warnings/Warnings";
function EditTable(props){
    const location = useLocation();
    const navigation = useNavigate();
    const {rows} = location.state
    const [newRows, setNewRows] = useState(rows)
    const [dtWarning, setDtWarning] = useState(false)
    const [showFilledWarning, setShowFilledWarning] = useState(false)
    const [createButtonClicked, setCreateButtonClicked] = useState(false)
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
    <TaskTable rows={newRows} setRows={setNewRows} handleDeleteRow = {handleDeleteRow} /> 
    <button onClick={handleCreateTable} className="createTableButton"> Create Time Table </button> 
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