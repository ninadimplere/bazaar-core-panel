export type Category = {
  id: number;
  name: string;
  parentId: number | null;
  slug: string;
  isActive: boolean;
  createdAt: string; // or Date if parsed
  updatedAt: string; // or Date if parsed
};

export type Product = {
  id: number;
  title: string;
  description: string;
  markedPrice: number;
  displayPrice: number;
  discountPercentage: number;
  displayPriority: number;
  category: Category;
  availableQuantity: number;
  imageUrl: string;
  productStatus: "ACTIVE" | "INACTIVE" | "OUTOFSTOCK" | "DRAFT";
  sellerId: number;
  slug: string;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
};
