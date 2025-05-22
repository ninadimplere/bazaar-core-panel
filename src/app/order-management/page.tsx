"use client";

import Breadcrumb from "@components/Breadcrumbs/Breadcrumb";
import { Tabs, Tab } from "@heroui/tabs";
import { useCallback, useEffect, useState } from "react";
import { bazaarApiGet } from "@utils/api-helper";
import {
  Button,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  Select,
  SelectItem,
  Link,
  TableColumn,
} from "@heroui/react";
import { col } from "framer-motion/client";
import OrderManagementConstants from "./constants";
import { Eye, MoreVertical } from "lucide-react";
import OrderProductDrawer from "@components/OrderManagement/OrderProductDrawer";

export default function Page() {
  const [activeTab, setActiveTab] = useState<any>("activeOrders");
  const [orders, setOrders] = useState<any[]>([]);
  const [orderCounts, setOrderCounts] = useState({
    activeOrders: 0,
    returnOrders: 0,
    cancellationRequests: 0,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    bazaarApiGet("/orders/counts").then((response) => {
      setOrderCounts({
          activeOrders: response.total, // Updated to use the correct property
          returnOrders: response.refunded + response.failed,
          cancellationRequests: response.cancelled,
        });
    });
  }, []);

  useEffect(() => {
    bazaarApiGet("/orders").then((response) => {
      setOrders(response);
    });
  }, [activeTab]);

  const renderCell = useCallback(
    (order: any, columnKey: string) => {
      switch (columnKey) {
        case "orderId":
          return (
            <div className="text-sm font-medium text-gray-600">
              {order.id}
            </div>
          );
        case "orderDate":
          return (
            <div className="text-sm font-medium text-gray-600">
              {new Date(order.createdAt).toLocaleDateString()}
            </div>
          );
        case "customerName":
          return (
            <div className="text-sm font-medium text-gray-600">
              {order.user.email}
            </div>
          );
        case "products":
          if (!order.products || order.products.length === 0) return null;
          return (
            <div className="flex items-start gap-4">
              <img
                src={order.products[0]?.product?.imageUrl || '/default-product-image.png'}
                alt="Product Image"
                className="w-8 h-8 object-cover rounded"
              />
              <div className="flex flex-col">
                <button
                  className="text-primary font-semibold hover:underline text-left"
                  onClick={() => setDrawerOpen(true)}
                  type="button"
                >
                  {order.products[0]?.product?.title}
                </button>
                {order.products.length > 1 && (
                  <button
                    className="text-xs text-gray-400 mt-1 hover:underline text-left"
                    onClick={() => setDrawerOpen(true)}
                    type="button"
                  >
                    +{order.products.length - 1} More Item{order.products.length > 2 ? "s" : ""}
                  </button>
                )}
              </div>
            </div>
          );
        case "totalAmount":
          return (
            <div className="text-sm font-bold text-gray-800">
              ${order.totalPrice}
            </div>
          );
        case "paymentStatus":
          return (
            <div className={`text-sm font-medium ${order.paymentStatus === 'PAID' ? 'text-green-600' : 'text-red-600'}`}>
              {order.paymentStatus}
            </div>
          );
        case "orderStatus":
          return (
            <div className="text-sm font-medium text-gray-600">
              {order.orderStatus}
            </div>
          );
        case "action":
          return (
            <div className="flex items-center justify-end gap-2">
              <Eye />
            <MoreVertical />
            </div>
            
          );
        default:
          return null;
      }
    },
    [orders],
  );

  return (
    <div className="w-full flex">
      <div className="w-full">
      <Breadcrumb pageName="Orders & Returns" />

      <div className="flex max-h-screen w-full flex-col overflow-hidden rounded-[10px] bg-white px-4 py-2 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex w-full items-center justify-center py-2">
          <Tabs
            color="primary"
            aria-label="Order Tabs"
            selectedKey={activeTab}
            onSelectionChange={setActiveTab}
            className="w-full max-w-5xl"
            size="lg"
          >
            <Tab key="activeOrders" title={`Active Orders (${orderCounts.activeOrders})`} />
            <Tab key="returnRequests" title={`Return Requests (${orderCounts.returnOrders})`} />
            <Tab key="cancellationRequests" title={`Cancellation Requests (${orderCounts.cancellationRequests})`} />
          </Tabs>
        </div>

        <div className="py-4">
          <h1 className="font-bold text-black">Search by Order ID & Customer Name</h1>
          <div className="mt-2 flex flex-row items-center gap-8 w-full">
            <input
              type="search"
              placeholder="Search"
              className="flex-1 min-w-[350px] max-w-[700px] rounded-full border bg-gray-2 px-5 py-3 outline-none transition-colors focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 dark:hover:text-dark-6 dark:focus-visible:border-primary"
            />
            <div className="flex flex-row items-center gap-4">
              <Select
                key="orderDateRange"
                defaultSelectedKeys={["10"]}
                label="Date Range"
                radius="full"
                size="sm"
                className="min-w-[180px] bg-gray-2 rounded-full"
              >
                {OrderManagementConstants.orderDateRange.map((dateRangeObj) => (
                  <SelectItem key={dateRangeObj.key}>{dateRangeObj.label}</SelectItem>
                ))}
              </Select>
              <Select
                key="orderStatus"
                defaultSelectedKeys={["10"]}
                label="Order Status"
                radius="full"
                size="sm"
                className="min-w-[180px] bg-gray-2 rounded-full"
              >
                {OrderManagementConstants.orderStatusFilter.map((statusObj) => (
                  <SelectItem key={statusObj.key}>{statusObj.label}</SelectItem>
                ))}
              </Select>
              <Select
                key="paymentStatus"
                defaultSelectedKeys={["10"]}
                label="Payment Status"
                radius="full"
                size="sm"
                className="min-w-[180px] bg-gray-2 rounded-full"
              >
                {OrderManagementConstants.paymentStatusFilter.map((paymentStatusObj) => (
                  <SelectItem key={paymentStatusObj.key}>{paymentStatusObj.label}</SelectItem>
                ))}
              </Select>
              <Link href="#" underline="always" className="text-sm whitespace-nowrap">
                Reset Filters
              </Link>
            </div>
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
          <TableHeader columns={OrderManagementConstants.orderTableColumns}>
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
          <TableBody items={orders}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey as string)}</TableCell>
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
            {OrderManagementConstants.paginationPageSizes.map(
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
      <OrderProductDrawer isOpen={drawerOpen} onOpenChange={() => setDrawerOpen(false)} />
      </div>
    </div>
  );
}