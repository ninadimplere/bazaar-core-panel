"use client";

import Breadcrumb from "@components/Breadcrumbs/Breadcrumb";
import {
  Button,
  Pagination,
  Select,
  SelectItem,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  useDisclosure,
} from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { CategoryManagementConstants } from "./constants";
import categoryManagementData from "./mock.json";
import {
  Category,
  CategoryObject,
  GetCategoriesResponse,
  Selection,
} from "./type";
import { Check, Pencil } from "lucide-react";
import { AddProductIcon } from "@assets/icons";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_CATEGORIES,
  GET_CATEGORY_COUNT,
  UPDATE_CATEGORY,
} from "@utils/graphql-queries";
import AddCategoryDrawer from "@components/CategoryManagement/AddCategoryDrawer";
import { s } from "framer-motion/client";

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [pageSize, setPageSize] = useState<string>("10");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeTab, setActiveTab] = useState<any>("allcategories");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [
    fetchCategories,
    { data: categoriesData, loading: loadingCategories },
  ] = useLazyQuery<GetCategoriesResponse>(GET_CATEGORIES);
  const [fetchTotal, { data: totalData, loading: loadingTotal }] =
    useLazyQuery(GET_CATEGORY_COUNT);

  const [
    updateCategory,
    { data: updateCategoryData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_CATEGORY);

  const renderCell = useCallback(
    (category: Category, columnKey: any) => {
      switch (columnKey) {
        case "categoryName":
          return (
            <div className="text-sm font-medium text-gray-600">
              {category.name}
            </div>
          );
        case "actions":
          return (
            <div className="flex items-center gap-2">
              <Pencil
                className="cursor-pointer hover:text-blue-500"
                onClick={() => {
                  setSelectedCategory(category);
                  onOpen();
                }}
              />
            </div>
          );
        case "parentName":
          return (
            <div className="text-sm text-gray-600">
              {category.parentName || "Is a parent"}
            </div>
          );
        case "slug":
          return (
            <div className="text-sm text-gray-600">{category.slug || "-"}</div>
          );
        case "subcategories":
          return (
            <div className="text-sm text-gray-600">
              {category.subcategories.length > 0
                ? category.subcategories.join(", ")
                : "No subcategories"}
            </div>
          );
        case "subcategoryCount":
          return (
            <div className="text-sm text-gray-600">
              {category.subcategories.length > 0
                ? category.subcategories.length
                : "No subcategories"}
            </div>
          );
        case "productCount":
          return (
            <div className="text-sm text-gray-600">
              {category.productCount > 0
                ? category.productCount
                : "No products"}
            </div>
          );
        default:
          return <div></div>;
      }
    },
    [categoryManagementData],
  );

  const handleApproveCategories = async () => {
    if (selectedKeys === "all") {
      categories.forEach(async (category) => {
        await updateCategory({
          variables: {
            id: category.id,
            input: {
              name: category.name,
              slug: category.slug,
              isActive: true,
              parentId: category.parentId ? Number(category.parentId) : null,
            },
          },
        });
      });

      setCategories([]);
      setSelectedKeys(new Set([]));
      setActiveTab("allcategories");
    } else if (selectedKeys.size === 0) {
      console.warn("No categories selected for approval.");
    } else {
      selectedKeys.forEach(async (key) => {
        const category = categories.find((cat) => cat.id === parseInt(key));
        if (category) {
          await updateCategory({
            variables: {
              id: category.id,
              input: {
                name: category.name,
                slug: category.slug,
                isActive: true,
                parentId: category.parentId ? Number(category.parentId) : null,
              },
            },
          });
        }
      });
    }
    setSelectedKeys(new Set([])); // Reset selection after approval
  };

  useEffect(() => {
    fetchCategories({
      variables: {
        offset: (pageNumber - 1) * parseInt(pageSize),
        limit: parseInt(pageSize),
        showActive: activeTab === "allcategories",
      },
    });

    fetchTotal({
      variables: {
        showActive: activeTab === "allcategories",
      },
    });
  }, [pageNumber, pageSize, fetchCategories, fetchTotal, isOpen]);

  useEffect(() => {
    setPageNumber(1);
    setPageSize("10");
    fetchCategories({
      variables: {
        offset: 0,
        limit: 10,
        showActive: activeTab === "allcategories",
      },
    });

    fetchTotal({
      variables: {
        showActive: activeTab === "allcategories",
      },
    });
  }, [activeTab]);

  useEffect(() => {
    if (categoriesData) {
      const categoryDataArr = categoriesData?.categories?.data?.map(
        (categoryObject: CategoryObject) => {
          const category: Category = {
            id: categoryObject.id,
            name: categoryObject.name,
            slug: categoryObject.slug,
            parentId: categoryObject.parent?.id,
            parentName: categoryObject.parent?.name,
            subcategories: categoryObject?.children?.map((child) => child.name),
            productCount: 0,
          };

          return category;
        },
      );

      setCategories(categoryDataArr);
    }
  }, [categoriesData]);

  return (
    <div className="w-full">
      <Breadcrumb pageName="Category Management" />

      <div className="flex max-h-203 w-full flex-col overflow-y-scroll rounded-[10px] bg-white px-4 py-2 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex w-full items-center justify-center py-2">
          <Tabs
            color="secondary"
            aria-label="Options"
            selectedKey={activeTab}
            onSelectionChange={setActiveTab}
            className="flex w-full justify-center" // Optional max width
            size="lg"
          >
            <Tab key="allcategories" title="All Categories" />
            <Tab key="approveCategories" title="Approve Categories" />
          </Tabs>
        </div>
        {activeTab === "allcategories" && (
          <div className="mt-1">
            <div className="py-3">
              <h1 className="font-bold text-black">
                Search Categories by Name
              </h1>
              <div className="mt-2 flex items-center justify-between gap-2">
                <input
                  type="search"
                  placeholder="Search"
                  className="w-1/2 items-center gap-3.5 rounded-full border bg-gray-2 px-3 py-3 outline-none transition-colors focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 dark:hover:text-dark-6 dark:focus-visible:border-primary"
                />
                <div className="flex w-1/2 items-center justify-end gap-2">
                  <Button
                    color="secondary"
                    startContent={<AddProductIcon />}
                    variant="solid"
                    onPress={() => {
                      onOpen();
                      setSelectedCategory(null); // Reset selected category for new addition
                    }}
                  >
                    ADD NEW CATEGORY
                  </Button>
                </div>
              </div>
            </div>

            <Table
              aria-label="Table with category management data"
              className="mt-4"
              color="primary"
              radius="none"
              shadow="none"
              isHeaderSticky
              classNames={{
                th: "bg-primary text-white",
                thead: "rounded-none",
              }}
            >
              <TableHeader
                columns={CategoryManagementConstants.categoryTableColumns}
              >
                {(column) => (
                  <TableColumn key={column.uid} align={"start"}>
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={categories}>
                {(item: Category) => (
                  <TableRow key={item.id}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="mb-4 mt-4 flex w-full items-center justify-end gap-4">
              <Select
                key="paginationPageSize"
                className="w-1/6"
                selectedKeys={[pageSize]}
                onChange={(e) => {
                  setPageSize(e.target.value);
                  setPageNumber(1);
                }}
                label="Page entries"
                labelPlacement="outside-left"
              >
                {CategoryManagementConstants.paginationPageSizes.map(
                  (paginationPageSizeObj) => (
                    <SelectItem key={paginationPageSizeObj.key}>
                      {paginationPageSizeObj.label}
                    </SelectItem>
                  ),
                )}
              </Select>

              {!loadingTotal && (
                <Pagination
                  color="secondary"
                  showControls
                  initialPage={pageNumber}
                  onChange={setPageNumber}
                  total={
                    totalData
                      ? Math.ceil(
                          totalData.totalCategories / parseInt(pageSize),
                        )
                      : 0
                  }
                />
              )}
            </div>
          </div>
        )}
        {activeTab === "approveCategories" && (
          <div className="mt-1">
            <div className="flex w-full items-center justify-end">
              <Button
                color="secondary"
                startContent={<Check />}
                variant="solid"
                isDisabled={selectedKeys !== "all" && selectedKeys.size === 0}
                onPress={handleApproveCategories}
              >
                APPROVE CATEGORY
              </Button>
            </div>
            <Table
              aria-label="Table with category management data"
              className="mt-4"
              color="primary"
              radius="none"
              shadow="none"
              isHeaderSticky
              selectedKeys={selectedKeys}
              selectionMode="multiple"
              onSelectionChange={(keys) => {
                setSelectedKeys(keys as Selection);
              }}
              classNames={{
                th: "bg-primary text-white",
                thead: "rounded-none",
              }}
            >
              <TableHeader
                columns={CategoryManagementConstants.categoryTableColumns}
              >
                {(column) => (
                  <TableColumn key={column.uid} align={"start"}>
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={categories}>
                {(item: Category) => (
                  <TableRow key={item.id}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="mb-4 mt-4 flex w-full items-center justify-end gap-4">
              <Select
                key="paginationPageSize"
                className="w-1/6"
                selectedKeys={[pageSize]}
                onChange={(e) => {
                  setPageSize(e.target.value);
                  setPageNumber(1);
                }}
                label="Page entries"
                labelPlacement="outside-left"
                isDisabled={categories.length === 0}
              >
                {CategoryManagementConstants.paginationPageSizes.map(
                  (paginationPageSizeObj) => (
                    <SelectItem key={paginationPageSizeObj.key}>
                      {paginationPageSizeObj.label}
                    </SelectItem>
                  ),
                )}
              </Select>

              {!loadingTotal && (
                <Pagination
                  color="secondary"
                  showControls
                  initialPage={pageNumber}
                  onChange={setPageNumber}
                  isDisabled={categories.length === 0}
                  total={
                    totalData
                      ? Math.ceil(
                          totalData.totalCategories / parseInt(pageSize),
                        )
                      : 0
                  }
                />
              )}
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <AddCategoryDrawer
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          selectedCategory={selectedCategory}
        />
      )}
    </div>
  );
}
