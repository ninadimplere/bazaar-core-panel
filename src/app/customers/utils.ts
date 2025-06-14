import { Address } from "./type";

export const formatDate = (lastOrderDate: string): string => {
  if (!lastOrderDate) return "N/A";
  const timestamp = lastOrderDate;
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" }); // e.g., "May"
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const createAddressString = (address: Address): string => {
  return `${address.addressLine1}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`;
};
