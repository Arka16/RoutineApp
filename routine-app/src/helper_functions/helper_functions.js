function startsBefore(time1, time2) {
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

function isValidPhoneNumber(phoneNumber) {
    // Regular expression for a valid US phone number (10 digits, optional dashes)
    const phoneRegex = /^\d{10}$|^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
  }

function isValidEmail(email) {
    // Regular expression for a valid email address
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
  

module.exports = { startsBefore, isValidPhoneNumber, isValidEmail };
