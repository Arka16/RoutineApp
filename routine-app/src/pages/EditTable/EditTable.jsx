import React from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation} from "react-router-dom";
import TaskTable from "../../components/TaskTable/TaskTable";
function EditTable(props){
    const location = useLocation();
    const navigation = useNavigate();
    const {rows, setRows, handleDeleteRow} = location.state
    return (
    <div>
    <h1> Edit Table </h1>
    
    </div>
    
    
    
    
    
    );
   
}

export default EditTable;