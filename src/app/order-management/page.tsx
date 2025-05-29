"use client";

import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Tabs, Tab } from "@heroui/tabs";
import { useCallback, useEffect, useState, useRef } from "react";
import { bazaarApiGet, bazaarApiPost } from "../../utils/api-helper";
import {
  Button,
  Table,
  TableHeader,
  TableRow,
  TableCell,  TableBody,
  Pagination,
  Select,
  SelectItem,
  Link,
  TableColumn,
} from "@heroui/react";
import OrderManagementConstants from "./constants";
import { Eye, MoreVertical } from "lucide-react";
import OrderProductDrawer from "../../components/OrderManagement/OrderProductDrawer";
import CustomCheckbox from "../../components/ui/CustomCheckbox";
import BulkActionConfirmation from "../../components/OrderManagement/BulkActionConfirmation";

export default function Page() {
  const [activeTab, setActiveTab] = useState<any>("activeOrders");
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderCounts, setOrderCounts] = useState({
    activeOrders: 0,
    returnOrders: 0,
    cancellationRequests: 0,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  const [searchQuery, setSearchQuery] = useState("");  
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set<number>());
  const [selectedBulkAction, setSelectedBulkAction] = useState<string>("");
  const [isApplyingBulkAction, setIsApplyingBulkAction] = useState(false);  const [pageSize, setPageSize] = useState<number>(10);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    bazaarApiGet("/orders/counts").then((response) => {
      setOrderCounts({
          activeOrders: response.total, // Updated to use the correct property
          returnOrders: response.refunded + response.failed,
          cancellationRequests: response.cancelled,
        });
    });
  }, []);  useEffect(() => {
    setIsLoading(true);
    bazaarApiGet("/orders").then((response) => {      setOrders(response);
      setFilteredOrders(response);
      console.log('First order ID:', response[0]?.id, 'Type:', typeof response[0]?.id); // Log the ID and its type
      setIsLoading(false);
    }).catch(error => {
      console.error("Failed to fetch orders:", error);
      setIsLoading(false);
    });
  }, [activeTab]);
  
  // Handle search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredOrders(orders);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = orders.filter(order => 
      order.id.toString().includes(query) ||
      order?.user?.email?.toLowerCase().includes(query) ||
      order?.user?.UserProfile?.fullName?.toLowerCase().includes(query) ||
      order.products.some((p: any) => p.product?.title?.toLowerCase().includes(query))
    );
    
    setFilteredOrders(filtered);
  }, [searchQuery, orders]);
  const handleOpenDrawer = (order: any) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };  // Handle row selection
  const toggleRowSelection = (orderId: number) => {
    console.log('Toggling selection for order ID:', orderId, typeof orderId);
    
    // Use a functional update for reliable state updates
    setSelectedRows(prevSelected => {
      const newSelected = new Set(prevSelected);
      const orderIdNum = Number(orderId);
      
      if (newSelected.has(orderIdNum)) {
        console.log('Removing order ID:', orderIdNum);
        newSelected.delete(orderIdNum);
      } else {
        console.log('Adding order ID:', orderIdNum);
        newSelected.add(orderIdNum);
      }
      
      console.log('New selected rows:', Array.from(newSelected));
      return newSelected;
    });
  };// Handle select all rows
  const toggleSelectAll = () => {
    setSelectedRows(prevSelected => {
      if (prevSelected.size === filteredOrders.length) {
        // If all are selected, unselect all
        console.log('Clearing all selections');
        return new Set();
      } else {
        // Otherwise select all
        const allOrderIds = filteredOrders.map(order => Number(order.id));
        console.log('Selecting all orders:', allOrderIds);
        return new Set(allOrderIds);
      }
    });
  };
  // Handle bulk action application
  const handleApplyBulkAction = async () => {
    if (!selectedBulkAction || selectedRows.size === 0) return;
    
    // Show the confirmation dialog instead of immediately applying the action
    setIsConfirmationOpen(true);
  };

  // This function will be called when the user confirms in the dialog
  const executeBulkAction = async () => {
    if (!selectedBulkAction || selectedRows.size === 0) return;
    
    setIsApplyingBulkAction(true);
    try {
      // Convert Set to Array for easier processing
      const selectedOrderIds = Array.from(selectedRows).map(id => Number(id));
      console.log('Processing bulk action for order IDs:', selectedOrderIds);
        // Process based on the selected action
      if (selectedBulkAction.startsWith('mark_')) {
        // Extract the status from the action key (e.g., 'mark_shipped' -> 'SHIPPED')
        const newStatus = selectedBulkAction.replace('mark_', '').toUpperCase();
        
        // Send all order ids at once to the new bulk endpoint
        await bazaarApiPost(`/orders/status`, {
          ids: selectedOrderIds,
          status: newStatus
        });
        
        // Refresh the order list
        bazaarApiGet("/orders").then((response) => {
          setOrders(response);
          setFilteredOrders(response);
        });
          // Clear selections after successful action
        setSelectedRows(new Set());
        setSelectedBulkAction("");
      } else if (selectedBulkAction === 'export_csv') {
        // Export functionality would go here
        // In a real implementation, this would generate and download a CSV file
        alert('Export CSV functionality would be implemented here');
        setSelectedRows(new Set());
        setSelectedBulkAction("");
      } else if (selectedBulkAction === 'delete') {
        // Delete functionality would go here
        // In a real implementation, this would delete the selected orders
        // API call would go here
        alert('Delete functionality would be implemented here');
        setSelectedRows(new Set());
        setSelectedBulkAction("");
      }
    } catch (error) {
      console.error('Error applying bulk action:', error);
    } finally {
      setIsApplyingBulkAction(false);
      setIsConfirmationOpen(false); // Close the confirmation dialog when done
    }
  };
  const renderCell = useCallback(
    (order: any, columnKey: string) => {
      switch (columnKey) {        case "select":
          return (
            <div className="flex items-center justify-center">
              <CustomCheckbox
                checked={selectedRows.has(Number(order.id))}
                onChange={() => toggleRowSelection(Number(order.id))}
                ariaLabel={`Select order ${order.id}`}
              />
            </div>
          );
        case "orderId":
          return (
            <div className="text-sm font-medium text-gray-800 font-mono">
              #{order.id}
            </div>
          );        case "orderDate":
          return (
            <div className="text-sm font-medium text-gray-700">
              {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </div>
          );        case "customerName":
          return (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                {order?.user?.UserProfile?.fullName ? 
                  order?.user?.UserProfile?.fullName.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">
                  {order?.user?.UserProfile?.fullName || 'Unknown User'}
                </div>
                <div className="text-xs text-gray-500">{order?.user?.email || 'N/A'}</div>
              </div>
            </div>
          );        case "products":
          if (!order?.products?.length) return null;
          return (
            <div className="flex items-start gap-3">
              <img
                src={order.products[0]?.product?.imageUrl || '/default-product-image.png'}
                alt="Product Image"
                className="w-10 h-10 object-cover rounded-lg border border-gray-200"
              />
              <div className="flex flex-col">
                <button
                  className="text-primary font-medium hover:underline text-left text-sm"
                  onClick={() => handleOpenDrawer(order)}
                  type="button"
                >
                  {order.products[0]?.product?.title || 'Untitled Product'}
                </button>
                {order.products.length > 1 && (
                  <button
                    className="text-xs text-gray-400 mt-1 hover:underline text-left"
                    onClick={() => handleOpenDrawer(order)}
                    type="button"
                  >
                    +{order.products.length - 1} More Item{order.products.length > 2 ? "s" : ""}
                  </button>
                )}
              </div>
            </div>          );
        case "totalAmount":
          return (
            <div className="text-sm font-semibold text-gray-800 tabular-nums">
              ${parseFloat(order.totalPrice).toFixed(2)}
            </div>
          );
        case "paymentStatus":
          const paymentStatusColors: Record<string, string> = {
            PAID: "bg-green-100 text-green-700 border border-green-200",
            PENDING: "bg-amber-100 text-amber-700 border border-amber-200",
            REFUNDED: "bg-blue-100 text-blue-700 border border-blue-200",
          };
          const paymentStatus = order.paymentStatus as keyof typeof paymentStatusColors;
          return (
            <div
              className={`text-xs font-medium px-2.5 py-1 ${paymentStatusColors[paymentStatus] || "bg-gray-100 text-gray-600"} rounded-full inline-block`}
            >
              {order.paymentStatus}
            </div>
          );
        case "orderStatus":          const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
            const newStatusKey = event.target.value;
            const validStatus = OrderManagementConstants.orderStatusFilter.find(
              (statusObj) => statusObj.key === newStatusKey
            );

            if (!validStatus) {
              console.error("Invalid order status selected");
              return;
            }            try {
              await bazaarApiPost(`/orders/status`, {
                ids: [Number(order.id)], // Send as array of order IDs
                status: validStatus.label.toUpperCase(), // Convert label to uppercase
              });
              // Refresh the orders list
              bazaarApiGet("/orders").then((response) => {
                setOrders(response);
                setFilteredOrders(response);
              });
            } catch (error) {
              console.error("Failed to update order status", error);
            }
          };          const orderStatusColors = {
            PENDING: "bg-amber-100 text-amber-700 border border-amber-200",
            PROCESSING: "bg-blue-100 text-blue-700 border border-blue-200",
            SHIPPED: "bg-indigo-100 text-indigo-700 border border-indigo-200",
            DELIVERED: "bg-green-100 text-green-700 border border-green-200",
            CANCELLED: "bg-red-100 text-red-700 border border-red-200",
          };
          
          return (
            <div className="flex items-center gap-2">
              <span className={`inline-block h-1.5 w-1.5 rounded-full ${
                order.orderStatus === 'DELIVERED' ? 'bg-green-500' : 
                order.orderStatus === 'SHIPPED' ? 'bg-indigo-500' : 
                order.orderStatus === 'PROCESSING' ? 'bg-blue-500' : 
                order.orderStatus === 'CANCELLED' ? 'bg-red-500' : 'bg-amber-500'
              }`}></span>
              <select
                className="text-xs font-medium border border-gray-300 rounded-full px-2.5 py-1 appearance-none cursor-pointer bg-no-repeat bg-right pr-8 focus:outline-none focus:ring-1 focus:ring-primary"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23667085' stroke-width='1.67' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e\")", backgroundPosition: "right 8px center" }}
                value={OrderManagementConstants.orderStatusFilter.find(
                  (statusObj) => statusObj.label.toUpperCase() === order.orderStatus
                )?.key || ""} // Map the orderStatus string to the corresponding dropdown key
                onChange={handleStatusChange}
              >
                {OrderManagementConstants.orderStatusFilter.map((statusObj) => (
                  <option key={statusObj.key} value={statusObj.key}>
                    {statusObj.label}
                  </option>
                ))}
              </select>            </div>
          );
        case "action":
          return (
            <div className="flex items-center justify-end gap-1">
              <button
                onClick={() => handleOpenDrawer(order)}
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600 hover:text-primary transition-colors"
                title="View Order Details"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600 hover:text-primary transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          );
        default:
          return null;      }    },
    [orders, selectedRows, toggleRowSelection, handleOpenDrawer, filteredOrders],
  );
    // No need for select all ref effect with custom checkbox component
  
  return (
    <div className="w-full flex">
      <div className="w-full">
        <div className="mb-5">
          <Breadcrumb pageName="Orders & Returns" />
        </div>
        
        <div className="flex max-h-screen w-full flex-col overflow-hidden rounded-[10px] bg-white p-6 shadow-sm border border-gray-100 dark:bg-gray-dark dark:shadow-card">
        <div className="flex w-full items-center justify-center pb-4">
          <Tabs
            color="primary"
            aria-label="Order Tabs"
            selectedKey={activeTab}
            onSelectionChange={setActiveTab}
            className="w-full"
            size="lg"
            variant="underlined"
          >
            <Tab key="activeOrders" title={`Active Orders (${orderCounts.activeOrders})`} />
            <Tab key="returnRequests" title={`Return Requests (${orderCounts.returnOrders})`} />
            <Tab key="cancellationRequests" title={`Cancellation Requests (${orderCounts.cancellationRequests})`} />
          </Tabs>
        </div>        <div className="py-5 border-b border-gray-200">
          <h1 className="font-semibold text-gray-900 text-lg mb-3">Search by Order ID & Customer Name</h1>
          <div className="flex flex-row items-center gap-5 w-full">
            <div className="relative flex-1 min-w-[350px] max-w-[600px]">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>              <input
                type="search"
                placeholder="Search by order ID, product, or customer"
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}              />
            </div>
            
            <div className="flex flex-row items-center gap-4"><Select
                key="orderDateRange"
                label="Date Range"
                radius="lg"
                size="sm"
                variant="bordered"
                className="min-w-[160px]"
                classNames={{
                  trigger: "border border-gray-300 bg-white text-sm py-1",
                  label: "text-xs text-gray-500",
                }}
              >
                {OrderManagementConstants.orderDateRange.map((dateRangeObj) => (
                  <SelectItem key={dateRangeObj.key}>{dateRangeObj.label}</SelectItem>
                ))}
              </Select>
              <Select
                key="orderStatus"
                label="Order Status"
                radius="lg"
                size="sm"
                variant="bordered"
                className="min-w-[160px]"
                classNames={{
                  trigger: "border border-gray-300 bg-white text-sm py-1",
                  label: "text-xs text-gray-500",
                }}
              >
                {OrderManagementConstants.orderStatusFilter.map((statusObj) => (
                  <SelectItem key={statusObj.key}>{statusObj.label}</SelectItem>
                ))}
              </Select>              <Select
                key="paymentStatus"
                label="Payment Status"
                radius="lg"
                size="sm"
                variant="bordered"
                className="min-w-[160px]"
                classNames={{
                  trigger: "border border-gray-300 bg-white text-sm py-1",
                  label: "text-xs text-gray-500",
                }}              >
                {OrderManagementConstants.paymentStatusFilter.map((paymentStatusObj) => (
                  <SelectItem key={paymentStatusObj.key}>{paymentStatusObj.label}</SelectItem>
                ))}
              </Select>
              
              <Link 
                href="#" 
                underline="always" 
                className="text-sm whitespace-nowrap text-primary font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bulk Actions Section */}
        <div className="flex items-center justify-between mt-4 mb-2">
          <div className="flex items-center gap-3">            <div className="flex items-center">
              <div className="mr-2">
                <CustomCheckbox
                  checked={filteredOrders.length > 0 && selectedRows.size === filteredOrders.length}
                  onChange={toggleSelectAll}
                  ariaLabel="Select all orders"
                />
              </div>
              <span className="text-sm text-gray-700">
                {selectedRows.size > 0 ? `${selectedRows.size} Selected` : "Select All"}
              </span>
            </div>
            
            {selectedRows.size > 0 && (              <div className="flex items-center gap-2">
                <Select
                  placeholder="Select action"
                  aria-label="Bulk Action"
                  className="min-w-[200px]"
                  radius="lg"
                  size="sm"
                  variant="bordered"
                  classNames={{
                    trigger: "border border-gray-300 bg-white text-sm py-1",
                    value: "text-sm",
                  }}                  onChange={(e) => {
                    if (e.target.value) {
                      setSelectedBulkAction(e.target.value.toString());
                    }
                  }}
                >
                  {OrderManagementConstants.bulkActions.map((action) => (
                    <SelectItem key={action.key}>
                      {action.label}
                    </SelectItem>
                  ))}
                </Select>
                <Button
                  color="primary"
                  radius="lg"
                  size="sm"
                  isDisabled={!selectedBulkAction || selectedRows.size === 0}
                  isLoading={isApplyingBulkAction}
                  onClick={handleApplyBulkAction}
                >
                  Apply
                </Button>
              </div>
            )}
          </div>
        </div>
          <Table
          aria-label="Orders table"
          className="mt-4"
          color="primary"
          radius="sm"
          shadow="none"
          isHeaderSticky
          isStriped={false}
          classNames={{
            th: "bg-primary text-white py-3",
            thead: "rounded-t-lg",
            tr: "border-b border-gray-200 hover:bg-gray-50",
          }}
        >
        <TableHeader columns={OrderManagementConstants.orderTableColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={
                  column.uid === "select"
                    ? "center"
                    : column.uid === "price" || column.uid === "totalAmount"
                    ? "start"
                    : column.uid === "action"
                      ? "end"
                      : "start"
                }
                className="text-xs font-semibold uppercase tracking-wider"              >                {column.uid === "select" ? (
                  <div className="flex items-center justify-center">
                    {/* Header checkbox removed */}
                  </div>
                ) : (
                  column.name                )}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={filteredOrders} emptyContent={"No orders found"}>
            {(item) => (
              <TableRow key={item.id} className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
                {(columnKey) => (
                  <TableCell className="py-3">{renderCell(item, columnKey as string)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>        <div className="mb-6 mt-6 flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Showing</span>            <Select
              key="paginationPageSize"
              className="min-w-[80px]"
              defaultSelectedKeys={["10"]}
              variant="bordered"
              size="sm"
              classNames={{
                trigger: "border border-gray-300 bg-white text-sm py-0 min-h-0 h-8",
              }}
              onChange={(e) => {
                if (e.target.value) {
                  setPageSize(parseInt(e.target.value.toString(), 10));
                }
              }}
            >{OrderManagementConstants.paginationPageSizes.map(
                (paginationPageSizeObj) => (
                  <SelectItem key={paginationPageSizeObj.key}>
                    {paginationPageSizeObj.label}
                  </SelectItem>
                )
              )}
            </Select>
            <span className="text-sm text-gray-500">of {filteredOrders.length} items</span>
          </div>

          <Pagination            color="primary"
            showControls
            showShadow={false}
            initialPage={1}            total={Math.ceil(filteredOrders.length / pageSize)}
            size="sm"
            classNames={{
              cursor: "bg-primary",
              item: "text-sm",
            }}
          />        </div>
      </div>      <OrderProductDrawer
        isOpen={drawerOpen}
        onOpenChange={() => {
          setDrawerOpen(false);
          setSelectedOrder(null);
        }}        orderDetails={selectedOrder}
        onOrderStatusUpdate={(orderId, newStatus) => {
          // Refresh the orders list after status update
          bazaarApiGet("/orders").then((response) => {
            setOrders(response);
            setFilteredOrders(response);
          }).catch(error => {
            console.error("Failed to refresh orders after status update:", error);
          });
        }}
      />

      {/* Confirmation Dialog for Bulk Actions */}
      <BulkActionConfirmation
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={executeBulkAction}
        actionLabel={selectedBulkAction}
        itemCount={selectedRows.size}
        isLoading={isApplyingBulkAction}
      />
      </div>
    </div>
  );
}