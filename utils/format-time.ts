import dayjs from "dayjs";

export const format = (timer: number): string => {
  if (timer < 10) {
    return `0${timer.toString()}`;
  }
  return timer.toString();
}

export const numberToTimer = (number: number): string => {
  const date = new Date(number);
  const locale = date.toLocaleTimeString();
  const sliced = locale.split(":");
  return `0000-00-00T00:${sliced[1]}:${sliced[2]}`
}

export const timerToNumber = (timer: string): number => {
  return dayjs(`0000-00-00T00:${timer}`).toDate().getTime()
}

export const basicTimerNumber: number = dayjs(`0000-00-00T00:00:30`).toDate().getTime();