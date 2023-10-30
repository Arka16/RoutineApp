import React from "react";
import TaskTable from "../../components/TaskTable/TaskTable";
import './CreateTable.css';
import { useNavigate } from 'react-router-dom';

function CreateTable(){
    const navigation = useNavigate();
    function handleCreateTable(){
        navigation("/schedule");
    }
    return (
            <div>
             <h1> Enter your Schedule Below </h1>
            <TaskTable/>   
            <button onClick={handleCreateTable} className="createTableButton"> Create Time Table </button> 
            </div>
            );
}

export default CreateTable;