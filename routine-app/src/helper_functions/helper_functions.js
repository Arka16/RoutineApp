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

module.exports = { startsBefore };
