import React from "react";
import { useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Settings from "../../components/Settings/Settings";
import axios from "axios";


function SchedulePage() {
  const location = useLocation();
  const navigation = useNavigate();
  const [data, setData] = useState([])
  const {rows, username} = location.state || {}

  const URL = "http://localhost:3000"
  
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
      <h1>Your Schedule</h1>
      <table className="task-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Task</th>
            <th>Goal</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
              const timeParts = row.time.split(':');
              const hour = parseInt(timeParts[0]);
              const minute = parseInt(timeParts[1]);
            
              // Format the time in 12-hour format
              let ampm = 'am';
              let formattedHour = hour;
              
              if (hour >= 12) {
                ampm = 'pm';
                if (hour > 12) {
                  formattedHour = hour - 12;
                }
              }
            
              // Handle midnight (00:00)
              if (hour === 0) {
                formattedHour = 12;
              }
            return (<tr key={index}>
             <td>{formattedHour}:{minute.toString().padStart(2, '0')} {ampm}</td>
              <td>{row.task}</td>
              <td>{row.goal}</td>
            </tr>)
})}
        </tbody>
      </table>
      <button onClick={handleEditTable} className="editTableButton"> Edit Table </button> 
      <button onClick={handleDeleteTable} className="editTableButton"> Delete and Create New Table </button> 
    </div>
  );
}

export default SchedulePage;