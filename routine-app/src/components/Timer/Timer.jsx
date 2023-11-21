import React, { useEffect, useState } from "react";
import "./Timer.css"
function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const [play, setPlay] = useState(false);
  const [breaks, setBreaks] = useState(false)
  const [heading, setHeading] = useState("Work")
  const [showOptions, setShowOptions] = useState(false);

  const handlePlayPause = () => {
    setPlay(!play);
  };

  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    let timer;
    if (play) {
      if (minutes === 0 && seconds === 0) {
        if(!breaks){
          setMinutes(5);
          setHeading("Break")

        }
        else{
          setMinutes(45)
          setHeading("Work")

        }
        
        setPlay(false);
        setBreaks(!breaks)
      } else if (seconds === 0) {
        setSeconds(59);
        setMinutes((prev) => prev - 1);
      } else {
        timer = setTimeout(() => setSeconds((prev) => prev - 1), 1000);
      }
    }
    // Clear the timer when the component unmounts or play is toggled off
    return () => clearTimeout(timer);
  }, [play, minutes, seconds]);

  return (
    <div style={timerContainerStyle}>
       <button className = "optionsButtonStyle" onClick={handleOptionsClick}>
          ⋮
        </button>
      <h2 style={timerTextStyle}>
       {heading}:   {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </h2>
      <button style={playPauseButtonStyle} onClick={handlePlayPause}>
        {play ? "⏸️" : "▶️"}
      </button>
    </div>
  );
}

const timerContainerStyle = {
  textAlign: "center",
  margin: "20px",
  padding: "10px",
  backgroundColor: "#f0f0f0",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const timerTextStyle = {
  fontSize: "24px",
  color: "#333",
};

const playPauseButtonStyle = {
  fontSize: "24px",
  marginLeft: "10px",
  cursor: "pointer",
};

export default Timer;
