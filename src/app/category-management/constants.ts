export const CategoryManagementConstants = {
  brandStatus: {
    active: "ACTIVE",
    inactive: "INACTIVE",
    draft: "DRAFT",
  },
  categoryTableColumns: [
    { name: "Category Name", uid: "categoryName" },
    { name: "Parent Category", uid: "parentName" },
    { name: "Slug", uid: "slug" },
    { name: "Subcategories", uid: "subcategories" },
    { name: "Subcategory Count", uid: "subcategoryCount" },
    { name: "Products", uid: "productCount" },
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
