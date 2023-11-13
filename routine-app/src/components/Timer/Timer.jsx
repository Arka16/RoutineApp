import React, { useEffect } from "react";
import { useState } from "react";





function Timer(){
    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)


    const [play, setPlay] = useState(false)
    const currentTime = new Date()
    const currentSeconds = currentTime.getSeconds()

    const handlePlayPause = () => {
        setPlay(!play)
      };

    useEffect(()=>{
        if(play){
            if(minutes === 0 && seconds === 0){
                setMinutes(25)
                setPlay(false)
            }
            else if(seconds === 0){
                setSeconds(59)
                setMinutes((prev)=>prev-1)
            }
            else{
                setSeconds((prev)=>prev-1)
            }
        }
    }, [currentSeconds])
    return (
        <div>
            <h2> TIME REMAINING: {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds} </h2>

            <button onClick={handlePlayPause}>
    {play ? "⏸️" : "▶️"}
  </button>
        </div>

    )

}

export default Timer