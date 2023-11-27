import React, { useEffect, useState } from "react";
import "./Timer.css";
import TimerOptions from "../TimerOptions/TimerOptions";
import alarmSound from "../../assets/sounds/mixkit-classic-short-alarm-993.wav";
import axios from "axios";

function Timer({ username }) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const [play, setPlay] = useState(false);
  const [breaks, setBreaks] = useState(false);
  const [heading, setHeading] = useState("Work");
  const [showOptions, setShowOptions] = useState(false);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [started, setStarted] = useState(false);
  const [selectedWorkOption, setSelectedWorkOption] = useState(3); 
  const [selectedBreakOption, setSelectedBreakOption] = useState(1); 
  const alarmAudio = new Audio(alarmSound);
  const URL = "http://localhost:3000"
  // Fetch initial timer data from the server when the component mounts
  useEffect(() => {
    axios.get(URL + "/timer/" + username)
      .then(response => {
        const { minutes, seconds, timerState, breaks, heading } = response.data;
        setMinutes(minutes);
        setSeconds(seconds);
        setPlay(timerState);
        setBreaks(breaks);
        setHeading(heading);
      })
      .catch(error => {
        console.error('Error fetching timer data:', error);
      });
  }, [username]);
  useEffect(()=>{
    axios.get(URL + "/timer/options/" + username)
    .then(response => {
      const {selectedWorkOption, selectedBreakOption} = response.data;
      setSelectedWorkOption(selectedWorkOption)
      setSelectedBreakOption(selectedBreakOption)
    })
    .catch(error =>{
      console.log("error fetching data from options: ", error)
    })
  }, [selectedBreakOption, selectedWorkOption])
  // Update timer data on the server when play/pause is toggled
  useEffect(() => {
    let timer;
    if (play) {
      setStarted(true)
      if (minutes === 0 && seconds === 0) {
        if(started){
          alarmAudio.play();
        } 
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
        
      } else if (seconds === 0) {
        setSeconds(59);
        setMinutes((prev) => prev - 1);
      } else {
        // Update timer on the server every second
        timer = setTimeout(() => {
          setSeconds((prev) => prev - 1);

          // Send a POST request to update the timer on the server
          axios.post(URL + '/timer/' + username, {
            minutes,
            seconds: seconds - 1,
            timerState: play,
            breaks,
            heading
          })
            // .then(response => {
            //   const { minutes, seconds, timerState, breaks, heading } = response.data;
            //   setMinutes(minutes);
            //   setSeconds(seconds);
            //   setPlay(timerState);
            //   setBreaks(breaks);
            //   setHeading(heading);
            // })
            .catch(error => {
              console.error('Error updating timer data:', error);
            });
        }, 1000);
      }
    }
    // Clear the timer when the component unmounts or play is toggled off
    return () => clearTimeout(timer);
  }, [play, minutes, seconds, breaks, heading, workDuration, breakDuration, username]);

  const handlePlayPause = () => {
    setPlay((prevPlay) => !prevPlay);
  };

  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="timer-container">
      <div className="options-container">
        <button className="options-button" onClick={handleOptionsClick}>
          ⋮
        </button>
        <div className="timer-options-container">
          {showOptions && <TimerOptions
            onClose={() => setShowOptions(false)}
            play={play}
            setMinutes={setMinutes}
            setSeconds={setSeconds}
            setWorkDuration={setWorkDuration}
            setBreakDuration={setBreakDuration}
            breaks={breaks}
            started={started}
            setShowOptions={setShowOptions}
            setPlay = {setPlay}
            setStarted = {setStarted}
            workDuration={workDuration}
            breakDuration={breakDuration}
            selectedWorkOption={selectedWorkOption}
            setSelectedWorkOption={setSelectedWorkOption}
            selectedBreakOption = {selectedBreakOption}
            setSelectedBreakOption = {setSelectedBreakOption}
            username = {username}
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
