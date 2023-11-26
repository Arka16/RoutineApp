import React, { useEffect } from 'react';
import './TimerOptions.css';


const BreakDurationOptions = ({ top, left, onClose, play, setMinutes, setSeconds, setBreakDuration, breaks, started, setShowOptions, selectedOption, setSelectedOption }) => {
  const options = [
    { min: 0, sec: 2, label: '2 sec' },
    { min: 5, sec: 0, label: '5 minutes' },
    { min: 10, sec: 0, label: '10 minutes' },
    { min: 15, sec: 0, label: '15 minutes' },
    { min: 20, sec: 0, label: '20 minutes' },
    { min: 25, sec: 0, label: '25 minutes' },
    { min: 30, sec: 0, label: '30 minutes' }
  ];

  useEffect(() => {
    // Set the initial selected option based on the prop
    if (selectedOption === undefined) {
      setSelectedOption(1); // Default to the fourth option (25 minutes)
    }
  }, [selectedOption, setSelectedOption]);

  const handleTimeChange = (index) => {
    if (breaks && !play && !started) {
      setMinutes(options[index].min);
      setSeconds(options[index].sec);
    }

    setBreakDuration(options[index].min);
    setShowOptions(false);
    setSelectedOption(index);
  };

  return (
    <div className="options-view" style={{ top, left }}>
      <ul>
        {options.map((option, index) => (
          <li key={index} className="solid-white-background" onClick={() => handleTimeChange(index)}>
            {selectedOption === index && '√'} {option.label}
          </li>
        ))}
        <li className="solid-white-background" onClick={onClose}>
          Close
        </li>
      </ul>
    </div>
  );
};

export default BreakDurationOptions;
