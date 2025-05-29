export const ORDER_TABS = [
  { key: "activeOrders", label: "Active Orders" },
  { key: "returnRequests", label: "Return Requests" },
  { key: "cancellationRequests", label: "Cancellation Requests" },
];

export const ORDER_STATUSES = ["Pending", "Shipped", "Delivered", "Cancelled"];
export const PAYMENT_STATUSES = ["Paid", "Unpaid", "Refunded"];

export const DATE_RANGES = ["Today", "This Week", "This Month"];

const OrderManagementConstants = {
  orderDateRange: [
    { key: "1", label: "Last 7 Days" },
    { key: "2", label: "Last 30 Days" },
    { key: "3", label: "Last 90 Days" },
    { key: "4", label: "This Year" },
  ],
  orderStatusFilter: [
    { key: "1", label: "Pending" },
    { key: "2", label: "Processing" },
    { key: "3", label: "Shipped" },
    { key: "4", label: "Delivered" },
    { key: "5", label: "Cancelled" },
  ],
  paymentStatusFilter: [
    { key: "1", label: "Paid" },
    { key: "2", label: "Unpaid" },
    { key: "3", label: "Refunded" },
  ],  orderTableColumns: [
    { name: "Order ID", uid: "orderId" },
    { name: "Order Date", uid: "orderDate" },
    { name: "Customer", uid: "customerName" },
    { name: "Products", uid: "products" },
    { name: "Amount", uid: "totalAmount" },
    { name: "Payment Status", uid: "paymentStatus" },
    { name: "Order Status", uid: "orderStatus" },
    { name: "Action", uid: "action" },
  ],
  paginationPageSizes: [
    { key: "10", label: "10" },
    { key: "15", label: "15" },
    { key: "20", label: "20" },
    { key: "25", label: "25" },
    { key: "30", label: "30" },
  ],
};

export default OrderManagementConstants;
