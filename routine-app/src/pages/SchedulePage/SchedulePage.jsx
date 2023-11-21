import React from "react";
import { useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Settings from "../../components/Settings/Settings";
import axios from "axios";
import './SchedulePage.css'
import Toggle from "../../components/Toggle/Toggle";
import { sendReminder } from "../../helper_functions/helper_functions";
import Timer from "../../components/Timer/Timer";
function SchedulePage() {
  const location = useLocation();
  const navigation = useNavigate();
  const [data, setData] = useState([])
  const {rows, username} = location.state || {}
  const [toggleChecked, setToggleChecked] = useState(false);
  const [playPauseStates, setPlayPauseStates] = useState([]);
  const [pastTasks, setPastTasks] = useState(new Array(data.length).fill(false))
  const [futureTasks, setFutureTasks] = useState({})
  const [curTask, setCurTask] = useState(false)
  const URL = "http://localhost:3000"


  
   

  async function  handleToggleChange (){
    setToggleChecked(!toggleChecked);
    try{
      const data = {username, toggleChecked, curTask, playPauseStates}
      await axios.put(URL + "/active", data)
    }
    catch(error){
      console.log("Error with toggle update")
      console.log(error.message)
    }
    
  };
  //console.log(toggleChecked)
  const fetchData = async () => {
    try{
      const response = await axios.get(URL + "/tables/" + username);
      //console.log(response)
      // console.log("TABLE");
      //onsole.log(response.data.data.table);
      setData(response.data.data.table)
    }
    catch(error){
      console.log(error)
    }
  }

  const fetchActiveState = async ()=> {
    try {
      const response = await axios.get(URL + "/active/" + username)
      setToggleChecked(response.data.toggleChecked)
      console.log("ACTIVE RESPONSE IS")
      console.log(response)
      if(response.data.playPauseStates){
        setPlayPauseStates(response.data.playPauseStates)
      }
     //setPlayPauseStates(response.data.playPauseStates);

    } catch (error) {
      console.log(error)
      
    }
  }

  const updatePastTasks = (newPastTasks) => {
    setPastTasks(newPastTasks);
  };

  const updateFutureTasks = (newFutureTasks) => {
    setFutureTasks(newFutureTasks);
  };

  useEffect(() => {
    fetchData();

    setCurTask(playPauseStates.some((state) => typeof state !== "undefined"));

    
    
    if(toggleChecked && data.length >= 1){
      sendReminder(playPauseStates, username, data, updatePastTasks, updateFutureTasks);
      // console.log("PRINTING PAST TASKS")
      // console.log(pastTasks)
    }
  },  [fetchData, toggleChecked, data, playPauseStates, username, updatePastTasks, pastTasks])



  useEffect(()=>{
     fetchActiveState()
  }, [toggleChecked, playPauseStates])


  // Load playPauseStates from localStorage on component mount
  useEffect(() => {
    const storedPlayPauseStates = localStorage.getItem("playPauseStates");
    if (storedPlayPauseStates) {
      setPlayPauseStates(JSON.parse(storedPlayPauseStates));
    }
  }, []);

  // Save playPauseStates to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("playPauseStates", JSON.stringify(playPauseStates));
  }, [playPauseStates]);



    



  
  
  const handlePlayPause = (index) => {
    setPlayPauseStates((prevState) => {
      const newPlayPauseStates = [...prevState];
      newPlayPauseStates[index] = !newPlayPauseStates[index];
      return newPlayPauseStates;
    });
    
  };
  function handleEditTable(){
    // console.log("DATA IN SCHEDUE IS")
    // console.log(data)
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
    // console.log(request.status)
    
  }


  return (
    <div>
      <Settings username = {username}/>
      <div className="toggle-container">
        <Toggle checked={toggleChecked} onChange={handleToggleChange} />
      </div>
      <h1>Your Schedule</h1>
      {toggleChecked && curTask && <Timer />}
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
              // console.log("START IS")
              // console.log(row.startTime)
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
              var taskStyle = 'normalStateStyle'
              if(toggleChecked){
                if(pastTasks[index]){
                  taskStyle = 'prevStateStyle'

                }
                if(futureTasks[index]){
                  taskStyle = 'futureStateStyle'
                }
              }
              //console.log(taskStyle)
              // console.log(pastTasks[index] + "AT INDEX " + index)
              // onClick = {()=> navigation("/entry", {
              //   state: {
              //     task: row.task,
              //     goal: row.goal,
              //     data,
              //     username
              //   }
              // })}
            return (<tr key={index} className={`tableRowStyle ${taskStyle ? taskStyle : ''}`}>
             <td> {toggleChecked && playPauseStates && !pastTasks[index] && !futureTasks[index] && (
  <button onClick={() => handlePlayPause(index)}>
    {playPauseStates[index] ? "⏸️" : "▶️"}
  </button>
)}{ formattedHour1}:{minute1.toString().padStart(2, '0')} {ampm1} -  {formattedHour2}:{minute2.toString().padStart(2, '0')} {ampm2} </td>
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