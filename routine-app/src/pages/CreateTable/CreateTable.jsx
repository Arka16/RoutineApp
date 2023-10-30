import React, { useState } from "react";
import TaskTable from "../../components/TaskTable/TaskTable";
import "./CreateTable.css";
import { useNavigate } from "react-router-dom";

function CreateTable() {
  const initialRows = Array(5).fill({ time: "", task: "", goal: "" });
  const [rows, setRows] = useState(initialRows);
  console.log("Row is: ");
  console.log(rows);
  const navigation = useNavigate();
  function handleCreateTable() {
    navigation("/schedule", { rows: JSON.stringify(rows) }); // Serialize rows to JSON
  }
  return (
    <div>
      <h1>Enter your Schedule Below</h1>
      <TaskTable rows={rows} setRows={setRows} />
      <button onClick={handleCreateTable} className="createTableButton">
        Create Time Table
      </button>
    </div>
  );
}

export default CreateTable;
