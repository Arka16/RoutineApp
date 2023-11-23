import React, { useState } from 'react';
import './TimerOptions.css';
import WorkDurationOptions from './WorkDurationOptions';
import BreakDurationOptions from './BreakDurationOptions';

const TimerOptions = ({ top, left, onClose, play, setMinutes, setSeconds, setWorkDuration, setBreakDuration, breaks, started, setShowOptions }) => {
  const [workHover, setWorkHover] = useState(false);
  const [breakHover, setBreakHover] = useState(false);

  return (
    <div className="options-view" style={{ top, left }}>
      <ul>
        <li className="main-dropdown solid-white-background" onMouseEnter={() => setWorkHover(true)} onMouseLeave={() => setWorkHover(false)}>
          Set Work duration →
          {workHover && (
            <div className="dropdown-options">
              <WorkDurationOptions 
              play={play} 
              setMinutes={setMinutes} 
              setSeconds={setSeconds} 
              setWorkDuration={setWorkDuration} 
              breaks = {breaks} 
              started = {started} 
              setShowOptions = {setShowOptions} />
            </div>
          )}
        </li>
        <li className="main-dropdown solid-white-background" onMouseEnter={() => setBreakHover(true)} onMouseLeave={() => setBreakHover(false)}>
          Set Break duration →
          {breakHover && (
            <div className="dropdown-options">
              <BreakDurationOptions 
              play={play} 
              setMinutes={setMinutes} 
              setSeconds={setSeconds} 
              setBreakDuration={setBreakDuration} 
              breaks = {breaks} 
              started = {started} 
              setShowOptions = {setShowOptions}
              />
            </div>
          )}
        </li>
        {/* Apply the class to other elements needing a solid white background */}
        <li className="solid-white-background">Set Alarm Sound</li>
        <li className="solid-white-background">Hide Timer</li>
        <li className="solid-white-background">Reset Timer</li>
        <li className="solid-white-background">Start Work Timer Automatically</li>
        <li className="solid-white-background">Start Break Timer Automatically</li>
        <li onClick={onClose} className="solid-white-background">Close</li>
      </ul>
    </div>
  );
};

export default TimerOptions;
