"use client";

import Breadcrumb from "@components/Breadcrumbs/Breadcrumb";
import { Tabs, Tab } from "@heroui/tabs";
import { bazaarApiGet } from "@utils/api-helper";
import { useCallback, useEffect, useState } from "react";
import { endpoints } from "./service";
import {
  Button,
  Link,
  Pagination,
  Progress,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { Copy, Download, Pencil, Trash2, Upload } from "lucide-react";
import { AddProductIcon } from "@assets/icons";
import AddProductDrawer from "@components/ProductManagement/AddProductDrawer";
import { ProductManagementConstants } from "./constants";
import { Product } from "./type";
import { col } from "framer-motion/client";

export default function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeTab, setActiveTab] = useState<any>("allproducts");
  const [addProductActiveStep, setAddProductActiveStep] = useState<number>(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [addProductActiveTab, setAddProductActiveTab] =
    useState<any>("basicInfo");
  const [productCounts, setProductCounts] = useState({
    allProducts: 0,
    activeProducts: 0,
    inactiveProducts: 0,
    draftProducts: 0,
    outOfStockProducts: 0,
    lowStockProducts: 0,
  });

  useEffect(() => {
    bazaarApiGet("/products/counts").then((res) => {
      setProductCounts({
        allProducts: res.allProducts,
        activeProducts: res.activeProducts,
        inactiveProducts: res.inactiveProducts,
        draftProducts: res.draftProducts,
        outOfStockProducts: res.outOfStockProducts,
        lowStockProducts: res.lowStockProducts,
      });
    });
  }, []);

  useEffect(() => {
    let url = "";
    switch (activeTab) {
      case "allproducts":
        url = endpoints.products;
        break;
      case "activeproducts":
        url = `${endpoints.products}?productStatus=ACTIVE`;
        break;
      case "inactiveproducts":
        url = `${endpoints.products}?productStatus=INACTIVE`;
        break;
      case "draftproducts":
        url = `${endpoints.products}?productStatus=DRAFT`;
        break;
      case "outofstockproducts":
        url = `${endpoints.products}?productStatus=OUTOFSTOCK`;
        break;
      case "lowstockproducts":
        url = `${endpoints.products}?isLowStock=true`;
        break;
      default:
        url = endpoints.products;
        break;
    }
    bazaarApiGet(url).then((res) => {
      setProducts(res);
    });
  }, [activeTab]);

  const renderCell = useCallback(
    (product: Product, columnKey: any) => {
      switch (columnKey) {
        case "products":
          return (
            <div className="flex items-center gap-2">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-sm font-bold text-gray-6">{product.title}</p>
                <p className="text-sm font-light text-gray-5">
                  {product.description}
                </p>
              </div>
            </div>
          );
        case "actions":
          return (
            <div className="flex items-center justify-end gap-2">
              <Pencil />
              <Copy />
              <Trash2 />
            </div>
          );
        case "sku":
          return (
            <div className="text-sm font-medium text-gray-600">
              {product.slug}
            </div>
          );
        case "category":
          return (
            <div className="text-sm font-medium text-gray-600">
              {product.category.name}
            </div>
          );
        case "discount":
          return (
            <div className="text-sm font-medium text-gray-600">
              {product.discountPercentage}%
            </div>
          );
        case "price":
          return (
            <div className="flex flex-col items-start text-sm font-medium">
              <p className="font-bold">${product.displayPrice}</p>
              <p className="font-light text-gray-5">Incl of all taxes</p>
            </div>
          );
        case "brand":
          return <div className="text-sm font-medium text-gray-600">Apple</div>;
        case "productStatus":
          return (
            <Select
              key="productStatusTable"
              defaultSelectedKeys={[product.productStatus.toLocaleLowerCase()]}
              radius="full"
              size="sm"
            >
              {ProductManagementConstants.productStatusFilter.map(
                (productStatusObj) => (
                  <SelectItem key={productStatusObj.key}>
                    {productStatusObj.label}
                  </SelectItem>
                ),
              )}
            </Select>
          );
        case "stockStatus":
          if (product.availableQuantity > 50) {
            return (
              <Progress
                className="max-w-md"
                color="success"
                value={product.availableQuantity}
              />
            );
          } else if (product.availableQuantity > 30) {
            return (
              <Progress
                className="max-w-md"
                color="warning"
                value={product.availableQuantity}
              />
            );
          } else {
            return (
              <Progress
                className="max-w-md"
                color="danger"
                value={product.availableQuantity}
              />
            );
          }
        default:
          return <div className="text-sm font-medium text-gray-600">ninad</div>;
      }
    },
    [products],
  );

  return (
    <div className="w-full">
      <Breadcrumb pageName="Product Management" />

      <div className="flex max-h-screen w-full flex-col overflow-hidden rounded-[10px] bg-white px-4 py-2 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex w-full items-center justify-center py-2">
          <Tabs
            color="secondary"
            aria-label="Options"
            selectedKey={activeTab}
            onSelectionChange={setActiveTab}
            className="w-full max-w-5xl" // Optional max width
            size="lg"
          >
            <Tab
              key="allproducts"
              title={`All Products (${productCounts.allProducts})`}
            />
            <Tab
              key="activeproducts"
              title={`Active Products (${productCounts.activeProducts})`}
            />
            <Tab
              key="inactiveproducts"
              title={`Inactive Products (${productCounts.inactiveProducts})`}
            />
            <Tab
              key="draftproducts"
              title={`Products in Draft (${productCounts.draftProducts})`}
            />
            <Tab
              key="outofstockproducts"
              title={`Out of Stock (${productCounts.outOfStockProducts})`}
            />
            <Tab
              key="lowstockproducts"
              title={`Low Stock (${productCounts.lowStockProducts})`}
            />
          </Tabs>
        </div>

        <div className="py-4">
          <h1 className="font-bold text-black">
            Search Products by Name, SKU or Brand
          </h1>
          <div className="mt-2 flex items-center justify-between gap-2">
            <input
              type="search"
              placeholder="Search"
              className="w-1/2 items-center gap-3.5 rounded-full border bg-gray-2 px-3 py-3 outline-none transition-colors focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 dark:hover:text-dark-6 dark:focus-visible:border-primary"
            />
            <div className="flex w-1/2 items-center justify-end gap-2">
              <Button color="primary" startContent={<Upload />} variant="light">
                Import CSV
              </Button>
              <Button
                color="primary"
                startContent={<Download />}
                variant="light"
              >
                Export Products
              </Button>
              <Button
                color="secondary"
                startContent={<AddProductIcon />}
                variant="solid"
                onPress={onOpen}
              >
                ADD NEW PRODUCT
              </Button>
            </div>
          </div>

          <div></div>
        </div>

        <div className="mt-4 flex w-1/2 items-center justify-between gap-4">
          <Select
            key="productDateRange"
            defaultSelectedKeys={["10"]}
            label="Date Range"
            radius="full"
            size="sm"
          >
            {ProductManagementConstants.productDateRange.map(
              (productDateRangeObj) => (
                <SelectItem key={productDateRangeObj.key}>
                  {productDateRangeObj.label}
                </SelectItem>
              ),
            )}
          </Select>
          <Select
            key="category"
            defaultSelectedKeys={["10"]}
            label="Category"
            radius="full"
            size="sm"
          >
            {ProductManagementConstants.productStatusFilter.map(
              (productStatusObj) => (
                <SelectItem key={productStatusObj.key}>
                  {productStatusObj.label}
                </SelectItem>
              ),
            )}
          </Select>
          <Select
            key="brand"
            defaultSelectedKeys={["10"]}
            label="Brand"
            radius="full"
            size="sm"
          >
            {ProductManagementConstants.productStatusFilter.map(
              (productStatusObj) => (
                <SelectItem key={productStatusObj.key}>
                  {productStatusObj.label}
                </SelectItem>
              ),
            )}
          </Select>
          <Select
            key="productStockStatus"
            defaultSelectedKeys={["10"]}
            label="Stock Status"
            radius="full"
            size="sm"
          >
            {ProductManagementConstants.stockStatus.map((stockStatusObj) => (
              <SelectItem key={stockStatusObj.key}>
                {stockStatusObj.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            key="productStatus"
            defaultSelectedKeys={["10"]}
            label="Product Status"
            radius="full"
            size="sm"
          >
            {ProductManagementConstants.productStatusFilter.map(
              (productStatusObj) => (
                <SelectItem key={productStatusObj.key}>
                  {productStatusObj.label}
                </SelectItem>
              ),
            )}
          </Select>
          <Link href="#" underline="always" className="text-sm">
            Reset Filters
          </Link>
        </div>

        <Table
          aria-label="Example table with custom cells"
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
          <TableHeader columns={ProductManagementConstants.productTableColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={
                  column.uid === "price"
                    ? "start"
                    : column.uid === "actions"
                      ? "end"
                      : "start"
                }
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={products}>
            {(item) => (
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
            {ProductManagementConstants.paginationPageSizes.map(
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
      <AddProductDrawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        addProductActiveStep={addProductActiveStep}
        addProductActiveTab={addProductActiveTab}
        setAddProductActiveStep={setAddProductActiveStep}
        setAddProductActiveTab={setAddProductActiveTab}
      />
    </div>
  );
}
