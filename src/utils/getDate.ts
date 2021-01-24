export const getDate = () => {
  const date = new Date();
  const day: number = date.getDate();
  const month: number = date.getMonth();
  const year: number = date.getFullYear();
  let hours: string = date.getHours().toString();
  let minutes: string = date.getMinutes().toString();

  hours = hours.length < 2 ? `0${hours}` : hours;
  minutes = minutes.length < 2 ? `0${minutes}` : minutes;

  let monthString: string;
  switch (month) {
    case 0: {
      monthString = "Январь";
      break;
    }
    case 1: {
      monthString = "Февраль";
      break;
    }
    case 2: {
      monthString = "Март";
      break;
    }
    case 3: {
      monthString = "Апрель";
      break;
    }
    case 4: {
      monthString = "Май";
      break;
    }
    case 5: {
      monthString = "Июнь";
      break;
    }
    case 6: {
      monthString = "Июль";
      break;
    }
    case 7: {
      monthString = "Август";
      break;
    }
    case 8: {
      monthString = "Сентябрь";
      break;
    }
    case 9: {
      monthString = "Октябрь";
      break;
    }
    case 10: {
      monthString = "Ноябрь";
      break;
    }
    case 11: {
      monthString = "Декабрь";
      break;
    }
    default: {
      monthString = "Январь";
      break;
    }
  }

  return `${day} ${monthString} ${year} ${hours}:${minutes}`;
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
