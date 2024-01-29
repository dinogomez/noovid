import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface StatusColors {
  [key: string]: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBgColorStatus = (statusString: string) => {
  // Define a mapping between each status and a corresponding background color
  const statusColors: StatusColors = {
    "Order Placed": "bg-blue-500",
    "Order Shipped": "bg-orange-500",
    "In Transit": "bg-yellow-500",
    "Arrived at Hub": "bg-pink-500",
    "Out for Delivery": "bg-purple-500",
    Delivered: "bg-green-500",
  };

  // Get the background color for the given status, default to gray if not found
  const bgColor = statusColors[statusString] || "bg-gray-500";

  return bgColor;
};
