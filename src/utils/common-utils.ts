import { Address } from "@/types/common-types";

export const createAddressString = (address: Address): string => {
  if (
    !address ||
    !address.addressLine1 ||
    !address.city ||
    !address.state ||
    !address.postalCode ||
    !address.country
  ) {
    return "NA";
  }
  return `${address.addressLine1}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`;
};
