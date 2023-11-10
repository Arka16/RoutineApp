import React from "react";
import { useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Settings from "../../components/Settings/Settings";
import axios from "axios";
import './SchedulePage.css'
import Toggle from "../../components/Toggle/Toggle";
function SchedulePage() {
  const location = useLocation();
  const navigation = useNavigate();
  const [data, setData] = useState([])
  const {rows, username} = location.state || {}
  const [toggleChecked, setToggleChecked] = useState(false);
  const [playPause, setPlayPause] = useState(" ▶ ")
  const URL = "http://localhost:3000"



   

  const handleToggleChange = () => {
    setToggleChecked(!toggleChecked);
  };
  console.log(toggleChecked)
  const fetchData = async () => {
    try{
      const response = await axios.get(URL + "/tables/" + username);
      console.log(response)
      // console.log("TABLE");
      //onsole.log(response.data.data.table);
      setData(response.data.data.table)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  } )


  function handlePlayPause(){
     if(playPause ===  "▶️"){
      setPlayPause("⏸️")
     }
     else{
      setPlayPause("▶️") 
     }
  }
  function handleEditTable(){
    console.log("DATA IN SCHEDUE IS")
    console.log(data)
    navigation("/edit",  {
      state: {
        data,
        username
      },
    });
  }

  async function handleDeleteTable(){
    const request = await axios.put(URL + "/tables/del", {username})
    if(request.status === 200){
      navigation("/createTable", {
        state: {
          username
        }
      });
    }
    console.log(request.status)
    
  }


  return (
    <div>
      <Settings username = {username}/>
      <div className="toggle-container">
        <Toggle checked={toggleChecked} onChange={handleToggleChange} />
      </div>
      <h1>Your Schedule</h1>
      <table className="task-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Task</th>
            <th>Goal</th>
          </tr>
        </thead>
        <tbody className="tableEntry" >
          {data.map((row, index) => {
              console.log("START IS")
              console.log(row.startTime)
              const timeParts1 = row.startTime.split(':');
              const hour1 = parseInt(timeParts1[0]);
              const minute1 = parseInt(timeParts1[1]);
            
              // Format the time in 12-hour format
              let ampm1 = 'am';
              let formattedHour1 = hour1;
              
              if (hour1 >= 12) {
                ampm1 = 'pm';
                if (hour1 > 12) {
                  formattedHour1 = hour1 - 12;
                }
              }
            
              // Handle midnight (00:00)
              if (hour1 === 0) {
                formattedHour1 = 12;
              }

              const timeParts2 = row.endTime.split(':');
              const hour2 = parseInt(timeParts2[0]);
              const minute2 = parseInt(timeParts2[1]);
            
              // Format the time in 12-hour format
              let ampm2 = 'am';
              let formattedHour2 = hour2;
              
              if (hour2 >= 12) {
                ampm2 = 'pm';
                if (hour2 > 12) {
                  formattedHour2 = hour2 - 12;
                }
              }
            
              // Handle midnight (00:00)
              if (hour2 === 0) {
                formattedHour2 = 12;
              }
              
            return (<tr key={index} className = "tableRowStyle" onClick = {()=> navigation("/entry", {
              state: {
                task: row.task,
                goal: row.goal,
                data,
                username
              }
            })}>
             <td> {toggleChecked && <button onClick={handlePlayPause}>  {playPause}   </button>}{ formattedHour1}:{minute1.toString().padStart(2, '0')} {ampm1} -  {formattedHour2}:{minute2.toString().padStart(2, '0')} {ampm2} </td>
              <td>{row.task}</td>
              <td>{row.goal}</td>
            </tr>)
})}
        </tbody>
      </table>
      {!toggleChecked && ( <div> <button onClick={handleEditTable} className="editTableButton"> Edit Table </button> 
      <button onClick={handleDeleteTable} className="editTableButton"> Delete and Create New Table </button> </div>)}
    </div>
  );
}

export default SchedulePage;