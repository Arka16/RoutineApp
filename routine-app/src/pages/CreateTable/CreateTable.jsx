import React, {useState} from "react";
import TaskTable from "../../components/TaskTable/TaskTable";
import './CreateTable.css';
import { useNavigate } from 'react-router-dom';

function CreateTable(){
    const initialRows = Array(5).fill({ time: '', task: '', goal: '' });
    const [rows, setRows] = useState(initialRows);
    const [createButtonClicked, setCreateButtonClicked] = useState(false)
    const [dtWarning, setDtWarning] = useState(false)
    console.log("Row is: ")
    console.log(rows)
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
              rows
            },
          });
        }
        
    }
    return (
            <div>
             <h1> Enter your Schedule Below </h1>
             <TaskTable rows={rows} setRows={setRows} handleDeleteRow = {handleDeleteRow} /> 
            <button onClick={handleCreateTable} className="createTableButton"> Create Time Table </button> 
            {showFilledWarning && createButtonClicked &&
             <div className="warning">
              <button onClick={closeFilledWarning} className= "warning-button"> close </button>
              <p className="warningText"> Warning: All entries on table must be filled! </p>
              </div>}
              {dtWarning && 
              <div  className="warning">
              <button onClick={closeDeleteWarning} className= "warning-button"> close </button>
              <p className="warningText"> Warning: Table must have atleast one row! </p>
              </div>
              }
            </div>
            );
}

export default CreateTable;