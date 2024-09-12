import { toZonedTime } from "date-fns-tz";

export const toLocalDate = (date: string | Date | number) => {
  return toZonedTime(new Date(date), "Asia/Calcutta");
};
