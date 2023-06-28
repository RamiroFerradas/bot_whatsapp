export const getDateTime = (): string => {
  const now = new Date();
  const year: number = now.getFullYear();
  let month: string | number = now.getMonth() + 1;
  let day: string | number = now.getDate();
  let hour: string | number = now.getHours();
  let minute: string | number = now.getMinutes();
  let second: string | number = now.getSeconds();
  month.toString().length === 1 ? (month = "0" + month) : "";
  day.toString().length === 1 ? (day = "0" + day) : "";
  hour.toString().length === 1 ? (hour = "0" + hour) : "";
  minute.toString().length === 1 ? (minute = "0" + minute) : "";
  second.toString().length === 1 ? (second = "0" + second) : "";

  const dateTime: string =
    year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;
  return dateTime;
};
