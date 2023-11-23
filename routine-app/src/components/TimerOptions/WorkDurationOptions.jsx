import React from 'react';
import './TimerOptions.css';


const WorkDurationOptions = ({ top, left, onClose, play, setMinutes, setSeconds, setWorkDuration, breaks, started, setShowOptions }) => {

  function handleTimeChange(min, sec){
    if(!breaks && !play && !started){
        setMinutes(min)
        setSeconds(sec)
    }
  
    setWorkDuration(min)
    setShowOptions(false)
  }
  return (
    <div className="options-view" style={{ top, left }}>
      <ul>
      <li className="solid-white-background" onClick = {()=>handleTimeChange(0, 2)}> 2 sec</li>
        <li className="solid-white-background"  onClick = {()=>handleTimeChange(0, 15)}>15 minutes</li>
        <li className="solid-white-background" onClick = {()=>handleTimeChange(20, 0)}> 20 minutes </li>
        <li className="solid-white-background" onClick = {()=>handleTimeChange(25, 0)}> 25 minutes </li>
        <li className="solid-white-background" onClick = {()=>handleTimeChange(30, 0)}>30 minutes </li>
        <li className="solid-white-background" onClick = {()=>handleTimeChange(45, 0)}>45 minutes</li>
        <li className="solid-white-background" onClick = {()=>handleTimeChange(60, 0)}>60 minutes </li>
        <li className="solid-white-background" onClick = {()=>handleTimeChange(75, 0)}> 75 minutes </li>
        <li className="solid-white-background" onClick = {()=>handleTimeChange(90, 0)}> 90 minutes </li>
        <li className="solid-white-background" onClick={onClose}>Close</li>
      </ul>
    </div>
  );
};

export default WorkDurationOptions;
