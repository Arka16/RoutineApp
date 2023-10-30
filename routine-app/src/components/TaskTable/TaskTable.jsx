import React, { useState } from 'react';
import './TaskTable.css'; // You can define your CSS for styling

function TaskTable() {
  const initialRows = Array(5).fill({ time: '', task: '', goal: '' });

  const [rows, setRows] = useState(initialRows);

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      [field]: value,
    };
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

      <div className="table-container">
        <table className="task-table">
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
                <td>
                  <input
                    type="time"
                    value={row.time}
                    onChange={(e) => handleRowChange(index, 'time', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.task}
                    onChange={(e) => handleRowChange(index, 'task', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.goal}
                    onChange={(e) => handleRowChange(index, 'goal', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleAddRow}>Add Row</button>
      {rows.length > 5 && (
        <button onClick={() => handleDeleteRow(rows.length - 1)}>Delete Last Row</button>
      )}
    </div>
  );
}

export default TaskTable;
