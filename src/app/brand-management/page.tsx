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
import { useCallback, useState } from "react";
import { BrandManagementConstants } from "./constants";
import brandManagementData from "./mock.json";
import { Brand, Selection } from "./type";
import { Check, Eye, Pencil } from "lucide-react";
import { AddProductIcon } from "@assets/icons";
import AddBrandDrawer from "@components/BrandManagement/AddBrandDrawer";
import { on } from "events";

export default function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeTab, setActiveTab] = useState<any>("allbrands");
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([""]));

  const categories = [
    { key: "electronics", label: "Electronics" },
    { key: "fashion", label: "Fashion" },
    { key: "home_appliances", label: "Home Appliances" },
    { key: "beauty", label: "Beauty & Personal Care" },
    { key: "sports", label: "Sports & Outdoors" },
    { key: "books", label: "Books" },
    { key: "furniture", label: "Furniture" },
    { key: "groceries", label: "Groceries" },
    { key: "toys", label: "Toys & Games" },
    { key: "automotive", label: "Automotive" },
    { key: "stationery", label: "Stationery & Office Supplies" },
    { key: "pet_supplies", label: "Pet Supplies" },
    { key: "health", label: "Health & Wellness" },
  ];

  const renderCell = useCallback(
    (brand: Brand, columnKey: any) => {
      switch (columnKey) {
        case "brandName":
          return (
            <div className="text-sm font-medium text-gray-600">
              {brand.brandName}
            </div>
          );
        case "actions":
          return (
            <div className="flex items-center gap-2">
              <Pencil
                className="cursor-pointer hover:text-blue-500"
                onClick={() => {
                  setSelectedBrand(brand);
                  onOpen();
                }}
              />
            </div>
          );
        case "logo":
          return (
            <div className="flex items-center">
              <img
                src={brand.logo}
                alt={`${brand.brandName} logo`}
                className="h-8 w-8 rounded-full"
              />
            </div>
          );
        case "description":
          return (
            <div className="text-sm text-gray-600">
              {brand.description || "No description available"}
            </div>
          );
        case "category":
          return (
            <div className="text-sm text-gray-600">
              {brand.category || "Uncategorized"}
            </div>
          );
        case "productCount":
          return (
            <div className="text-sm text-gray-600">
              {brand.productCount || 0}
            </div>
          );
        default:
          return <div></div>;
      }
    },
    [brandManagementData],
  );

  return (
    <div className="w-full">
      <Breadcrumb pageName="Brand Management" />

      <div className="flex max-h-screen w-full flex-col overflow-hidden rounded-[10px] bg-white px-4 py-2 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex w-full items-center justify-center py-2">
          <Tabs
            color="secondary"
            aria-label="Options"
            selectedKey={activeTab}
            onSelectionChange={setActiveTab}
            className="flex w-full justify-center" // Optional max width
            size="lg"
          >
            <Tab key="allbrands" title="All Brands" />
            <Tab key="approveBrands" title="Approve Brands" />
          </Tabs>
        </div>
        {activeTab === "allbrands" && (
          <div className="mt-1">
            <div className="py-3">
              <h1 className="font-bold text-black">Search Brands by Name</h1>
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
                    onPress={onOpen}
                  >
                    ADD NEW BRAND
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-1 flex w-1/4 items-center justify-between gap-4">
              <Select
                className="max-w-xs"
                placeholder="Filter by Category"
                selectionMode="multiple"
              >
                {categories.map((category) => (
                  <SelectItem key={category.key}>{category.label}</SelectItem>
                ))}
              </Select>
            </div>

            <Table
              aria-label="Table with brand management data"
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
              <TableHeader columns={BrandManagementConstants.brandTableColumns}>
                {(column) => (
                  <TableColumn key={column.uid} align={"start"}>
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={brandManagementData}>
                {(item: Brand) => (
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
                defaultSelectedKeys={["10"]}
                label="Page entries"
                labelPlacement="outside-left"
              >
                {BrandManagementConstants.paginationPageSizes.map(
                  (paginationPageSizeObj) => (
                    <SelectItem key={paginationPageSizeObj.key}>
                      {paginationPageSizeObj.label}
                    </SelectItem>
                  ),
                )}
              </Select>

              <Pagination
                color="secondary"
                showControls
                initialPage={1}
                total={10}
              />
            </div>
          </div>
        )}
        {activeTab === "approveBrands" && (
          <div className="mt-1">
            <div className="flex w-full items-center justify-end">
              <Button
                color="secondary"
                startContent={<Check />}
                variant="solid"
                onPress={() => {}}
              >
                APPROVE BRAND
              </Button>
            </div>
            <Table
              aria-label="Table with brand management data"
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
              <TableHeader columns={BrandManagementConstants.brandTableColumns}>
                {(column) => (
                  <TableColumn key={column.uid} align={"start"}>
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={brandManagementData}>
                {(item: Brand) => (
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
                defaultSelectedKeys={["10"]}
                label="Page entries"
                labelPlacement="outside-left"
              >
                {BrandManagementConstants.paginationPageSizes.map(
                  (paginationPageSizeObj) => (
                    <SelectItem key={paginationPageSizeObj.key}>
                      {paginationPageSizeObj.label}
                    </SelectItem>
                  ),
                )}
              </Select>

              <Pagination
                color="secondary"
                showControls
                initialPage={1}
                total={10}
              />
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <AddBrandDrawer
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          selectedBrand={selectedBrand}
        />
      )}
    </div>
  );
}
