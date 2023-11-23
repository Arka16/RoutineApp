import React, { useEffect, useState } from "react";
import "./Timer.css";
import TimerOptions from "../TimerOptions/TimerOptions";
import alarmSound from "../../assets/sounds/mixkit-classic-short-alarm-993.wav";

function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const [play, setPlay] = useState(false);
  const [breaks, setBreaks] = useState(false);
  const [heading, setHeading] = useState("Work");
  const [showOptions, setShowOptions] = useState(false);
  const [workDuration, setWorkDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)
  const [started, setStarted] = useState(false)
  const alarmAudio = new Audio(alarmSound);

  const handlePlayPause = () => {
    setPlay(!play);
  };

  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    let timer;
    if (play) {
      setStarted(true)
      if (minutes === 0 && seconds === 0) {
        setStarted(false)
        if (!breaks) {
          setMinutes(breakDuration);
          setHeading("Break");
        } else {
          setMinutes(workDuration);
          setHeading("Work");
        }

        setPlay(false);
        setBreaks(!breaks);
        alarmAudio.play();
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
    <div className="timer-container">
      <div className="options-container">
        <button className="options-button" onClick={handleOptionsClick}>
          ⋮
        </button>
        <div className="timer-options-container">
          {showOptions && <TimerOptions 
          onClose={() => setShowOptions(false)} 
          play = {play} 
          setMinutes = {setMinutes} 
          setSeconds = {setSeconds} 
          setWorkDuration = {setWorkDuration} 
          setBreakDuration = {setBreakDuration}
          breaks = {breaks}
          started = {started}
          setShowOptions = {setShowOptions}
          />}
        </div>
      </div>
      <div className="header-container">
        <h4> {heading}</h4>
        <h2 className="timer-text">
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </h2>
      </div>
      <div className="play-pause-container">
        <button className="play-pause-button" onClick={handlePlayPause}>
          {play ? "⏸️" : "▶️"}
        </button>
      </div>
    </div>
  );
}

export default Timer;
