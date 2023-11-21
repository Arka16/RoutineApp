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
      if (minutes === 0 && seconds === 0) {
        if (!breaks) {
          setMinutes(5);
          setHeading("Break");
        } else {
          setMinutes(45);
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
          {showOptions && <TimerOptions onClose={() => setShowOptions(false)} />}
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
