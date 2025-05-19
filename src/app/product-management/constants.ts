export const ProductManagementConstants = {
  productStatus: {
    active: "ACTIVE",
    inactive: "INACTIVE",
    draft: "DRAFT",
    outOfStock: "OUTOFSTOCK",
  },
  productTableColumns: [
    { name: "Products", uid: "products" },
    { name: "SKU", uid: "sku" },
    { name: "Stock Status", uid: "stockStatus" },
    { name: "Category", uid: "category" },
    { name: "Brand", uid: "brand" },
    { name: "Discount", uid: "discount" },
    { name: "Price", uid: "price" },
    { name: "Product Status", uid: "productStatus" },
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
  stockStatus: [
    { key: "instock", label: "In Stock" },
    { key: "lowstock", label: "Low Stock" },
    { key: "outofstock", label: "Out of Stock" },
  ],
  productStatusFilter: [
    { key: "active", label: "Active" },
    { key: "inactive", label: "Inactive" },
    { key: "draft", label: "Draft" },
  ],
};
