import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getURL = (path: string = "") => {
  let url =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process?.env?.NEXT_PUBLIC_VERCEL_URL ||
  "http://localhost:3000/";
  
  url = url.replace(/\/+$/, "");
  url = url.includes("http") ? url : `https://${url}`;
  path = path.replace(/^\/+/, "");
  
  return path ? `${url}/${path}` : url;
};

export const getRandomElement = <T>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];