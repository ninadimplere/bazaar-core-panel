import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Category,
  GetCategoriesForDropdownResponse,
} from "@app/category-management/type";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  CREATE_CATEGORY,
  GET_CATEGORIES_FOR_DROPDOWN,
  UPDATE_CATEGORY,
} from "@utils/graphql-queries";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";

type AddCategoryDrawerProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedCategory?: Category | null;
};

export default function AddCategoryDrawer({
  isOpen,
  onOpenChange,
  selectedCategory,
}: AddCategoryDrawerProps) {
  const editMode = !!selectedCategory;

  const [categoryName, setCategoryName] = useState<string>(
    selectedCategory?.name || "",
  );
  const [categorySlug, setCategorySlug] = useState<string>(
    selectedCategory?.slug || "",
  );
  const [parentCategoryId, setParentCategoryId] = useState<string>(
    selectedCategory?.parentId ? String(selectedCategory.parentId) : "-1",
  );

  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [updateCategory, { data, loading, error }] =
    useMutation(UPDATE_CATEGORY);

  const [
    fetchCategoriesForDropdown,
    { data: categoriesData, loading: loadingCategories },
  ] = useLazyQuery<GetCategoriesForDropdownResponse>(
    GET_CATEGORIES_FOR_DROPDOWN,
  );

  const [createCategory, { data: createData, loading: createLoading }] =
    useMutation(CREATE_CATEGORY);

  useEffect(() => {
    fetchCategoriesForDropdown({
      variables: {
        offset: 0,
        limit: 1000,
        showActive: true,
      },
    });
  }, [fetchCategoriesForDropdown]);

  useEffect(() => {
    if (categoriesData) {
      const categoryOptions = categoriesData.categories.data.map(
        (category) => ({
          value: String(category.id),
          label: category.name,
        }),
      );
      const updatedCategoryOptions = [
        { value: "-1", label: "No Parent" },
        ...categoryOptions,
      ];
      setCategoryOptions(updatedCategoryOptions);
    }
  }, [categoriesData]);

  const saveEditCategory = async () => {
    if (editMode) {
      await updateCategory({
        variables: {
          id: selectedCategory?.id,
          input: {
            name: categoryName,
            slug: categorySlug,
            isActive: true,
            parentId:
              parentCategoryId === "-1" ? null : Number(parentCategoryId),
          },
        },
      });
    } else {
      await createCategory({
        variables: {
          input: {
            name: categoryName,
            slug: categorySlug,
            isActive: false,
            parentId:
              parentCategoryId === "-1" ? null : Number(parentCategoryId),
          },
        },
      });
    }
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="mt-10 flex flex-row items-center justify-between gap-1">
              <h1 className="text-2xl font-bold text-black">{`${editMode ? "Edit" : "Add"} Category`}</h1>
            </DrawerHeader>
            <DrawerBody>
              <div className="flex flex-col gap-4">
                <Input
                  label="Category Name"
                  placeholder="Enter Category Name"
                  type="text"
                  className="bg-white text-black"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <Input
                  label="Category Slug"
                  placeholder="Enter Category Slug"
                  type="text"
                  className="bg-white text-black"
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                />
                <Select
                  key="paginationPageSize"
                  className="w-full"
                  selectedKeys={[parentCategoryId]}
                  onChange={(e) => {
                    setParentCategoryId(e.target.value);
                  }}
                  label="Parent Category"
                >
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value}>{option.label}</SelectItem>
                  ))}
                </Select>
              </div>
              <div className="mt-4 w-full">
                <Button
                  color="primary"
                  startContent={<Save />}
                  variant="solid"
                  onPress={() => {
                    onClose();
                    saveEditCategory();
                  }}
                  className="w-full"
                >
                  Save Category
                </Button>
              </div>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
