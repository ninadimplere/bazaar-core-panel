export const CustomerConstants = {
  productStatus: {
    active: "ACTIVE",
    inactive: "INACTIVE",
    draft: "DRAFT",
    outOfStock: "OUTOFSTOCK",
  },
  customerTableColumns: [
    { name: "Customer Name", uid: "customerName" },
    { name: "Email", uid: "email" },
    { name: "Total Orders", uid: "totalOrders" },
    { name: "Total Spent", uid: "totalSpent" },
    { name: "Last Order Date", uid: "lastOrderDate" },
    { name: "Location", uid: "location" },
    { name: "Tag", uid: "tag" },
    { name: "Actions", uid: "actions" },
  ],
  paginationPageSizes: [
    { key: "10", label: "10" },
    { key: "15", label: "15" },
    { key: "20", label: "20" },
    { key: "25", label: "25" },
    { key: "30", label: "30" },
  ],
  productDateRange: [
    { key: "1month", label: "Less than 1 month" },
    { key: "3months", label: "Less than 3 months" },
    { key: "6months", label: "Less than 6 months" },
    { key: "12months", label: "Less than a year" },
    { key: "1yead", label: "More than a year" },
  ],
};
