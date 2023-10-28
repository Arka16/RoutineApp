import React, { useState } from 'react';
import './TaskTable.css'; // You can define your CSS for styling

function TaskTable() {
  const [rows, setRows] = useState(Array(5).fill({ time: '', task: '', goal: '' }));

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { time: '', task: '', goal: '' }]);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  return (
    <div>
      <div className="task-table">
        {rows.map((row, index) => (
          <div key={index} className="task-row">
            <input
              className="task-cell"
              type="text"
              value={row.time}
              placeholder="Time"
              onChange={(e) => handleRowChange(index, 'time', e.target.value)}
            />
            <input
              className="task-cell"
              type="text"
              value={row.task}
              placeholder="Task"
              onChange={(e) => handleRowChange(index, 'task', e.target.value)}
            />
            <input
              className="task-cell"
              type="text"
              value={row.goal}
              placeholder="Goal"
              onChange={(e) => handleRowChange(index, 'goal', e.target.value)}
            />
            <button onClick={() => handleDeleteRow(index)}>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={handleAddRow}>Add Row</button>
    </div>
  );
}

export default TaskTable;
