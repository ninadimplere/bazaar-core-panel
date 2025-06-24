export type Brand = {
  id: number;
  brandName: string;
  logo: string;
  description: string;
  category: string;
  productCount: number;
};
export type Selection = "all" | Set<string>;
