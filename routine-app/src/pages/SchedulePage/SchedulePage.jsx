import React from "react";
import { useLocation, useParams } from "react-router-dom";

function SchedulePage() {
  const location = useLocation();
  

  const state = location.state;
  const {rows, param2} = location.state

//   const parsedRows = JSON.parse(rows || "[]");

  return (
    <div>
      <h1>Your Schedule</h1>
      <h2>{param2}</h2>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Task</th>
            <th>Goal</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.time}</td>
              <td>{row.task}</td>
              <td>{row.goal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SchedulePage;
