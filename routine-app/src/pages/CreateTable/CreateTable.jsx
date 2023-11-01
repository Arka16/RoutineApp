import React, {useState} from "react";
import TaskTable from "../../components/TaskTable/TaskTable";
import './CreateTable.css';
import { useNavigate } from 'react-router-dom';
import Warnings from "../../components/Warnings/Warnings";
function CreateTable(){
    const startingNum = 1
    const initialRows = Array(startingNum).fill({ time: '', task: '', goal: '' });
    const [rows, setRows] = useState(initialRows);
    const [createButtonClicked, setCreateButtonClicked] = useState(false)
    const [dtWarning, setDtWarning] = useState(false)
  
    const navigation = useNavigate();
    const [showFilledWarning, setShowFilledWarning] = useState(false)
    

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
    function handleCreateTable(){
      setCreateButtonClicked(true)
       var filled = true;
        rows.forEach((item) => {
          if (!item.time || !item.task || !item.goal){
            setShowFilledWarning(true)
            filled = false
          }
        })
        if(filled){
          navigation("/schedule",  {
            state: {
              rows: rows,
            },
          });
        }
        
    }
    return (
            <div>
             <h1> Enter your Schedule Below </h1>
             <TaskTable rows={rows} setRows={setRows} handleDeleteRow = {handleDeleteRow} /> 
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

export default CreateTable;