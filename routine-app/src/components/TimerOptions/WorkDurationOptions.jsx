import React from 'react';
import './TimerOptions.css';


const WorkDurationOptions = ({ top, left, onClose, play, setMinutes, setSeconds, setWorkDuration, breaks }) => {

  function handleTimeChange(min, sec){
    if(!breaks && !play){
        setMinutes(min)
        setSeconds(sec)
    }
  
    setWorkDuration(min)
  }
  return (
    <div className="options-view" style={{ top, left }}>
      <ul>
      <li onClick = {()=>handleTimeChange(0, 2)}> 2 sec</li>
        <li onClick = {()=>handleTimeChange(0, 15)}>15 minutes</li>
        <li onClick = {()=>handleTimeChange(20, 0)}> 20 minutes </li>
        <li onClick = {()=>handleTimeChange(25, 0)}> 25 minutes </li>
        <li onClick = {()=>handleTimeChange(30, 0)}>30 minutes </li>
        <li onClick = {()=>handleTimeChange(45, 0)}>45 minutes</li>
        <li onClick = {()=>handleTimeChange(60, 0)}>60 minutes </li>
        <li onClick = {()=>handleTimeChange(75, 0)}> 75 minutes </li>
        <li onClick = {()=>handleTimeChange(90, 0)}> 90 minutes </li>
        <li onClick={onClose}>Close</li>
      </ul>
    </div>
  );
};

export default WorkDurationOptions;
