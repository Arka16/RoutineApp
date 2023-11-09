import React from 'react';
import './TaskTable.css'; // You can define your CSS for styling
function TaskTable(props) {
  // const initialRows = Array(5).fill({ time: '', task: '', goal: '' });

  // const [rows, setRows] = useState(initialRows);
  const rows = props.rows
  const setRows = props.setRows
  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      [field]: value,
    };
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { time: '', startTime: '', endTime: '', task: '', goal: '' }]);
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
    <div className="time-input">
      <input
        type="time"
        value={row.startTime}
        onChange={(e) => handleRowChange(index, 'startTime', e.target.value)}
      />
      <span className="dash">-</span>
      <input
        type="time"
        value={row.endTime}
        onChange={(e) => handleRowChange(index, 'endTime', e.target.value)}
      />
    </div>
  </td>
                
                <td>
                  <input
                    type="text"
                    value={row.task}
                    placeholder= {index === 0 ? 'Interview Prep' : ""}
                    onChange={(e) => handleRowChange(index, 'task', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.goal}
                    placeholder= {index === 0 ? 'Prepare the answers of 3 questions' : ""}
                    onChange={(e) => handleRowChange(index, 'goal', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleAddRow}>Add Row</button>
    
      <button onClick={() => props.handleDeleteRow(rows.length - 1)}>Delete Row</button>
      
    </div>
  );
}

export default TaskTable;
