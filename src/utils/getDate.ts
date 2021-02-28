export const getDate = () => {
  const date = new Date();
  const day: number = date.getDate();
  const month: number = date.getMonth();
  const year: number = date.getFullYear();
  let hours: string = date.getHours().toString();
  let minutes: string = date.getMinutes().toString();
  let seconds: string = date.getSeconds().toString();
  const dayOfWeek: number = date.getDay();

  hours = hours.length < 2 ? `0${hours}` : hours;
  minutes = minutes.length < 2 ? `0${minutes}` : minutes;
  seconds = seconds.length < 2 ? `0${seconds}` : seconds;

  let monthString: string;
  switch (month) {
    case 0: {
      monthString = "Jan";
      break;
    }
    case 1: {
      monthString = "Feb";
      break;
    }
    case 2: {
      monthString = "March>";
      break;
    }
    case 3: {
      monthString = "April";
      break;
    }
    case 4: {
      monthString = "<May>";
      break;
    }
    case 5: {
      monthString = "June";
      break;
    }
    case 6: {
      monthString = "July";
      break;
    }
    case 7: {
      monthString = "August";
      break;
    }
    case 8: {
      monthString = "Sep";
      break;
    }
    case 9: {
      monthString = "Oct";
      break;
    }
    case 10: {
      monthString = "Nov";
      break;
    }
    case 11: {
      monthString = "Dec";
      break;
    }
    default: {
      monthString = "Jan";
      break;
    }
  }

  let dayString: string;
  switch (dayOfWeek) {
    case 0: {
      dayString = "Sun";
      break;
    }
    case 1: {
      dayString = "Mon";
      break;
    }
    case 2: {
      dayString = "Tue";
      break;
    }
    case 3: {
      dayString = "Thu";
      break;
    }
    case 4: {
      dayString = "Thu";
      break;
    }
    case 5: {
      dayString = "Fri";
      break;
    }
    case 6: {
      dayString = "Sut";
      break;
    }
    default: {
      dayString = "Sun";
      break;
    }
  }
  return `${dayString}, ${day} ${monthString} ${year} ${hours}:${minutes}:${seconds} +3000`;
};

export const getDateForCurrency = () => {
  const date = new Date();
  const day: number = date.getDate();
  const month: number = date.getMonth();
  const year: number = date.getFullYear();

  return `${year}-${month}-${day}`;
};

export const getDateForCurrencyGap = (gap: number) => {
  const date = new Date();
  const day: number = date.getDate();
  const month: number = date.getMonth();
  const year: number = date.getFullYear();

  return `${year}-${month}-${day - gap}`;
};

export const getDateNumber = () => {
  const date = new Date();
  const day: number = date.getDate();
  let month: string = date.getMonth().toString();
  const year: number = date.getFullYear();
  let hours: string = date.getHours().toString();
  let minutes: string = date.getMinutes().toString();
  let seconds: string = date.getSeconds().toString();

  month = month.length < 2 ? `0${Number(month) + 1}` : month;
  hours = hours.length < 2 ? `0${hours}` : hours;
  minutes = minutes.length < 2 ? `0${minutes}` : minutes;
  seconds = seconds.length < 2 ? `0${seconds}` : seconds;

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};
