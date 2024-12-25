import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const getFromLocalStorage = (key) => {
  try {
    const data = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting data from localStorage:', error);
    return null;
  }
};

export const setToLocalStorage = (key, value) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error('Error setting data to localStorage:', error);
  }
};
export const FormatDate = (isoDate) => {
  const date = new Date(isoDate);

  return date.toLocaleString('en-BD', {
    timeZone: 'Asia/Dhaka',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

