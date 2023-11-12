import axios from "axios";

const URL = "http://localhost:3000"

export function startsBefore(time1, time2) {
    const timeParts1 = time1.split(':');
    const timeParts2 = time2.split(':');
    const hour1 = parseInt(timeParts1[0]);
    const hour2 = parseInt(timeParts2[0]);
    
    if (hour1 === hour2) {
        const minute1 = parseInt(timeParts1[1]);
        const minute2 = parseInt(timeParts2[1]);
        return minute1 < minute2;
    }
    
    return hour1 < hour2;
}

export function isValidPhoneNumber(phoneNumber) {
    // Regular expression for a valid US phone number (10 digits, optional dashes)
    const phoneRegex = /^\d{10}$|^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
  }

export function isValidEmail(email) {
    // Regular expression for a valid email address
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  function returnFormattedTime(originalFormattedTime) {
    // Assuming the input format is "HH:mm am/pm"
    const [time, period] = originalFormattedTime.split(' ');
    const [hours, minutes] = time.split(':');
  
    // Reformat the time
    const formattedTime = `${hours}:${minutes} ${period}`;
  
    return formattedTime;
  }

  function isCurrentTimeBetween(startHour, startMinute, endHour, endMinute) {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
  
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
  
    return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes;
  }
  let lastReminderTime = 0;
  export async function sendReminder(playPauseStates, username, data, setPastTasks){
    let index = -1
    for(var i = 0; i < data.length; i++){
      var st = data[i].startTime
      var et = data[i].endTime
      if(st && et){
        const timeParts1 = st.split(':');
        const hour1 = parseInt(timeParts1[0]);
        const minute1 = parseInt(timeParts1[1]);
        const timeParts2 = et.split(':');
        const hour2 = parseInt(timeParts2[0]);
        const minute2 = parseInt(timeParts2[1]);
        if(isCurrentTimeBetween(hour1, minute1, hour2, minute2)){
          index = i
          break
        }
        // else {
        //   setPastTasks((pastStates) => {
        //     const newPastStates = [...pastStates]
        //     if(newPastStates[i] === false){
        //       newPastStates[i] = true
        //     }
        //     return newPastStates;
        //   });
        // }
        setPastTasks((pastStates)=>{
          const newPastStates = [...pastStates]
          let ind = 0;
          while(ind < i){
            newPastStates[ind] = true
            ind++
          }
          console.log("NEW PAST STATES")
          console.log(newPastStates)
          return newPastStates
        })
        

      }

    }
    console.log("TASK TO MESSAGE IS ")
    console.log(index)
    if(index !== -1 && !playPauseStates[index]){
      const reminderInterval = 10 * 1000; 
      const currentTime = Date.now()
      if(currentTime - lastReminderTime >= reminderInterval){
        try {
          const data = {username, index}
          await axios.post(URL + "/message", data)
          lastReminderTime = currentTime    
        } catch (error) {
          console.log("ERROR during sending reminder")
        }
      }

    }
    
    
   
    
    
  }
  

