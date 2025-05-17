export const endpoints = {
  products: "/products",
  productCounts: "/products/counts",
  productDetails: (id: string) => `/products/${id}`,
};
