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
