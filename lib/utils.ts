import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime(); // Cast to number

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30; // Assuming a month is 30 days
  const year = day * 365; // Assuming a year is 365 days

  // Calculate the time difference in different units
  const years = Math.floor(timeDifference / year);
  const months = Math.floor(timeDifference / month);
  const weeks = Math.floor(timeDifference / week);
  const days = Math.floor(timeDifference / day);
  const hours = Math.floor(timeDifference / hour);
  const minutes = Math.floor(timeDifference / minute);

  // Return the formatted string
  if (years > 0) {
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  } else if (months > 0) {
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else if (weeks > 0) {
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    return "Just now";
  }
};




export const formatBigNumber = (number: number): string => {
  if (number >= 1e9) {
    // Billions
    return `${(number / 1e9).toFixed(1)}B`;
  } else if (number >= 1e6) {
    // Millions
    return `${(number / 1e6).toFixed(1)}M`;
  } else if (number >= 1e3) {
    // Thousands
    return `${(number / 1e3).toFixed(1)}K`;
  } else {
    // Less than 1000
    return number.toString();
  }
};



