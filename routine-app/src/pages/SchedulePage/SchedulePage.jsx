import React from "react";
import { useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';



function SchedulePage() {
  const location = useLocation();
  const navigation = useNavigate();
  const {rows} = location.state
  function handleEditTable(){
    navigation("/edit",  {
      state: {
        rows
      },
    });
  }
  return (
    <div>
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
          {rows.map((row, index) => {
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
    </div>
  );
}

export default SchedulePage;
