/* eslint-disable import/order */
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export const uuidV4 = () => v4()

export const getRandomColor = () =>  {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
