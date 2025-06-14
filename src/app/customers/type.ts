export type Customer = {
  customerId: string;
  name: string;
  email: string;
  number?: string;
  orderCount: number;
  totalSpend: number;
  lastOrderDate: string;
  memberSince: string;
  address: Address;
  tag: "NEW" | "ONE-TIME" | "HIGH-SPENDER" | "FREQUENT" | string;
};

export type Address = {
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};
