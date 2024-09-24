import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFormattedDate = (date: string): string => {
  const formattedDate = moment(date).format("YYYY-MM-DD");
  return formattedDate;
};

export const getFormattedTime = (date: string): string => {
  const formattedDate = moment(date).format("hh:mm A");
  return formattedDate;
};

export const getUTCTimestamp = (date: string) => {
  const utcDate = moment.utc(date, "YYYY-MM-DD HH:mm", true);

  if (!utcDate.isValid()) return null;

  const formattedUTCDate = utcDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  return formattedUTCDate;
};
