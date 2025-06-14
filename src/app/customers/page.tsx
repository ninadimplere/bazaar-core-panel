"use client";

import Breadcrumb from "@components/Breadcrumbs/Breadcrumb";
import {
  Button,
  Link,
  Pagination,
  Select,
  SelectItem,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { Download, Eye, MessagesSquare } from "lucide-react";
import { CustomerConstants } from "./constants";
import customerData from "./mock.json";
import { useCallback, useState } from "react";
import { Customer } from "./type";
import CustomerInfoDrawer from "@components/Customers/CustomerInfoDrawer";
import { formatDate } from "./utils";

export default function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [customerTableData, setCustomerTableData] =
    useState<Customer[]>(customerData);

  const renderCell = useCallback(
    (customer: Customer, columnKey: any) => {
      switch (columnKey) {
        case "customerName":
          return (
            <div className="text-sm font-medium text-gray-600">
              {customer.name}
            </div>
          );
        case "actions":
          return (
            <div className="flex items-center gap-2">
              <Eye
                className="cursor-pointer"
                onClick={() => {
                  setSelectedCustomer(customer);
                  onOpen();
                }}
              />
              <MessagesSquare />
            </div>
          );
        case "email":
          return (
            <div className="text-sm font-medium text-gray-600">
              {customer.email}
            </div>
          );
        case "totalOrders":
          const orderCount = customer.orderCount;
          if (orderCount > 50) {
          }
          return (
            <div
              className="text-sm font-medium text-gray-600"
              title={`${orderCount} orders`}
            >
              {customer.orderCount}
            </div>
          );
        case "totalSpent":
          return (
            <div className="text-sm font-medium text-gray-600">
              `$ {customer.totalSpend}`
            </div>
          );
        case "lastOrderDate":
          const timestamp = formatDate(customer.lastOrderDate);
          return (
            <div className="text-sm font-medium text-gray-600">{timestamp}</div>
          );
        case "location":
          return (
            <div className="text-sm font-medium text-gray-600">
              {customer.address.city}, {customer.address.state},{" "}
              {customer.address.country}
            </div>
          );
        case "tag":
          const tagClass =
            customer.tag === "NEW"
              ? "bg-[#377DFF] text-white"
              : customer.tag === "ONE-TIME"
                ? "bg-[#8890A6] text-white"
                : customer.tag === "HIGH-SPENDER"
                  ? "bg-[#622BC5] text-white"
                  : customer.tag === "FREQUENT"
                    ? "bg-[#2DCA73] text-white"
                    : "bg-blue text-white";
          return (
            <div
              className={`inline-flex items-center rounded-sm px-2 py-1 text-xs font-medium ${tagClass}`}
            >
              {customer.tag}
            </div>
          );
        default:
          return <div></div>;
      }
    },
    [customerTableData],
  );

  return (
    <div className="w-full">
      <Breadcrumb pageName="Customers" />

      <div className="flex max-h-screen w-full flex-col overflow-hidden rounded-[10px] bg-white px-4 py-2 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="py-4">
          <h1 className="font-bold text-black">
            Search Customers by Name or Email
          </h1>
          <div className="mt-2 flex items-center justify-between gap-2">
            <input
              type="search"
              placeholder="Search"
              className="w-1/2 items-center gap-3.5 rounded-full border bg-gray-2 px-3 py-3 outline-none transition-colors focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 dark:hover:text-dark-6 dark:focus-visible:border-primary"
            />
            <div className="flex w-1/2 items-center justify-end gap-2">
              <Button
                color="primary"
                startContent={<Download />}
                variant="light"
              >
                Download Report
              </Button>
            </div>
          </div>

          <div></div>
        </div>

        <div className="mt-2 flex items-center justify-between gap-4">
          <div className="flex w-1/2 gap-4">
            <Select
              key="category"
              defaultSelectedKeys={["10"]}
              label="Sort by Location"
              radius="full"
              size="sm"
            >
              <SelectItem key=""></SelectItem>
            </Select>
            <Select
              key="productDateRange"
              defaultSelectedKeys={["10"]}
              label="Date Range"
              radius="full"
              size="sm"
            >
              {CustomerConstants.productDateRange.map((productDateRangeObj) => (
                <SelectItem key={productDateRangeObj.key}>
                  {productDateRangeObj.label}
                </SelectItem>
              ))}
            </Select>

            <Link href="#" underline="always" className="text-sm">
              Reset Filters
            </Link>
          </div>
          <div className="flex w-1/2 items-center justify-end gap-2">
            {" "}
            <Switch defaultSelected size="sm">
              Show high spender
            </Switch>
            <Switch defaultSelected size="sm">
              Show frequent buyer
            </Switch>
          </div>
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
          <TableHeader columns={CustomerConstants.customerTableColumns}>
            {(column) => (
              <TableColumn key={column.uid} align={"start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={customerTableData}>
            {(item) => (
              <TableRow key={item.customerId}>
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
            {CustomerConstants.paginationPageSizes.map(
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
      <CustomerInfoDrawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedCustomer={selectedCustomer}
      />
    </div>
  );
}
