function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
};

let HourDate = () => {
    const fullDate = new Date;
    let hour = addZero(fullDate.getHours());
    let min = addZero(fullDate.getMinutes());
    let sec = addZero(fullDate.getSeconds());
    let HourDate = hour + ":" + min + ":" + fullDate.getSeconds();
    let dayDate = fullDate.getDate() + "/" + (sec+1) + "/" + fullDate.getFullYear();
    console.log(HourDate);
    return HourDate.value;
};

module.exports = HourDate;
  

