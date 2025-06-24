export const BrandManagementConstants = {
  brandStatus: {
    active: "ACTIVE",
    inactive: "INACTIVE",
    draft: "DRAFT",
  },
  brandTableColumns: [
    { name: "Brand Name", uid: "brandName" },
    { name: "Logo", uid: "logo" },
    { name: "Description", uid: "description" },
    { name: "Category", uid: "category" },
    { name: "Product Count", uid: "productCount" },
    { name: "Actions", uid: "actions" },
  ],
  paginationPageSizes: [
    { key: "10", label: "10" },
    { key: "15", label: "15" },
    { key: "20", label: "20" },
    { key: "25", label: "25" },
    { key: "30", label: "30" },
  ],
};
