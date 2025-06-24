export type Category = {
  id: number;
  name: string;
  parentName: string | undefined | null;
  parentId: number | null | undefined;
  slug: string;
  subcategories: string[];
  productCount: number; // or JSX.Element if you're rendering buttons/icons directly
};

export type Selection = "all" | Set<string>;

export type CategoryObject = {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
  parentId: number | null;
  parent?: CategoryObject;
  children: CategoryObject[];
};

export type GetCategoriesResponse = {
  categories: {
    success: boolean;
    message?: string;
    data: CategoryObject[];
  };
};

export type GetCategoriesForDropdownResponse = {
  categories: {
    success: boolean;
    message?: string;
    data: { id: number; name: string }[];
  };
};
