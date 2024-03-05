import moment from "moment";

export const changeDateFormat = (date) => moment(date).format("DD MMM YYYY , hh:mm A");
export const changeDate = (date) => moment(date).format("DD MMM YYYY");

export const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  };

export const formatTime = (time) => {
    return moment(time, 'HH:mm').format('hh:mm a');
  };

export const formatHours = (totalWorkHours) => {
  if (typeof totalWorkHours !== 'string') {
    return ""; // Or handle the invalid input in any other appropriate way
  }
  
  const [hours, minutes] = totalWorkHours.split(":").map(Number);
  
  return `${hours} hr ${minutes} min`;
  }