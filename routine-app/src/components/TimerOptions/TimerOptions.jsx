import React from 'react';
import './TimerOptions.css';

const TimerOptions = ({ top, left, onClose }) => {
  return (
    <div className="options-view" style={{ top, left }}>
      <ul>
        <li>Set Work duration</li>
        <li>Set Break duration </li>
        <li>Set Alarm Sound </li>
        <li> Hide Timer </li>
        <li> Reset Timer </li>
        <li> Start Work Timer Automatically </li>
        <li> Start Break Timer Automatically </li>
        <li onClick={onClose}>Close</li>
      </ul>
    </div>
  );
};

export default TimerOptions;
