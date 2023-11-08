import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function TableEntry(){
    const location = useLocation()
    const navigation = useNavigate()
    const {task, goal, data, username} = location.state || {}
    return (
        <div>
        <h1> TASK: {task} Goal {goal} </h1>
        <button onClick={()=>navigation("/schedule", {
            state: {
              rows: data,
              username:username
            },
          })} > Back </button>
        </div>
    )

}

export default TableEntry;