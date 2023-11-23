import React from 'react';
import './TimerOptions.css';


const BreakDurationOptions = ({ top, left, onClose, play, setMinutes, setSeconds, setBreakDuration, breaks, started, setShowOptions }) => {

  function handleTimeChange(min, sec){
    if(breaks && !play && !started){
      setMinutes(min)
      setSeconds(sec)

    }
  
    setBreakDuration(min)
    setShowOptions(false)
  }
  return (
    <div className="options-view" style={{ top, left }}>
      <ul>
      <li className="solid-white-background"  onClick = {()=>handleTimeChange(0, 2)}> 2 sec</li>
        <li className="solid-white-background"  onClick = {()=>handleTimeChange(5, 0)}> 5 minutes</li>
        <li className="solid-white-background"  onClick = {()=>handleTimeChange(10, 0)}> 10 minutes </li>
        <li className="solid-white-background"  onClick = {()=>handleTimeChange(15, 0)}> 15 minutes </li>
        <li className="solid-white-background" onClick = {()=>handleTimeChange(20, 0)}> 20 minutes </li>
        <li className="solid-white-background" onClick = {()=>handleTimeChange(25, 0)}> 25 minutes</li>
        <li className="solid-white-background" onClick = {()=>handleTimeChange(30, 0)}>30 minutes </li>
      </ul>
    </div>
  );
};

export default BreakDurationOptions;
