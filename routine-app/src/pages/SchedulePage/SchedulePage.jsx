import React from "react";
import { useParams } from "react-router-dom";

function SchedulePage() {
    const { rows } = useParams();
    const parsedRows = JSON.parse(rows || "[]"); // Use an empty array as the default value
    
  console.log("parsed rows are")
  console.log(parsedRows);
  return (
    <div>
      <h1>Your Schedule</h1>
      <div>
        {parsedRows.map((row, index) => (
          <div key={index}>
            <p>Time: {row.time}</p>
            <p>Task: {row.task}</p>
            <p>Goal: {row.goal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SchedulePage;
