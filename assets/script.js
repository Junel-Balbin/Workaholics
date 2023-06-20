// Function for current date and time.
function nowTime() {
  var dateElement = $("#date");
  var timeElement = $("#time");
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  var currentTime = dayjs().format("hh:mm:ss a");
  dateElement.text(currentDate);
  timeElement.text(currentTime);
}

setInterval(nowTime);