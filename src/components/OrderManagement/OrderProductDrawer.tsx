import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@heroui/react";
import { formatDate } from "../../utils/timeframe-extractor";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { bazaarApiPost, bazaarApiGet } from "../../utils/api-helper";
import { useState, useEffect } from "react";
import OrderManagementConstants from "../../app/order-management/constants";

type AddressType = {
  id: number;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type SellerType = {
  id: number;
  userId: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  profileImageUrl: string | null;
  status: string;
};

type SellerOrderType = {
  id: number;
  orderId: number;
  sellerId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  sellerNote: string;
  seller: SellerType;
};

type OrderDetailsType = {
  id: number;
  userId: string;
  totalPrice: number;
  shippingCharges: number;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
  paymentTime: string;
  updatedAt: string;
  user: {
    email: string;
    addresses: AddressType[];
    UserProfile: {
      fullName: string;
      phoneNumber: string;
      profileImage: string;
    };
  };
  products: Array<{
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    sellerOrderId: number | null;      product: {
        id: number;
        title: string;
        description: string;
        markedPrice: number;
        displayPrice: number;
        discountPercentage: number;
        imageUrl: string;
        productStatus: string;
        sellerId: string;
        availableQuantity: number;
      };
    SellerOrder: SellerOrderType | null;
  }>;
  SellerOrder: SellerOrderType[];
};

export default function OrderProductDrawer({
  isOpen,
  onOpenChange,
  orderDetails,
  onOrderStatusUpdate,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  orderDetails: OrderDetailsType | null;
  onOrderStatusUpdate?: (orderId: number, newStatus: string) => void;
}) {
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [currentOrderStatus, setCurrentOrderStatus] = useState<string>("");
  
  // Initialize the current status when orderDetails changes
  useEffect(() => {
    if (orderDetails) {
      setCurrentOrderStatus(orderDetails.orderStatus);
    }
  }, [orderDetails]);
  
  if (!orderDetails) return null;

  const formatAddress = (address: AddressType) => {
    const parts = [
      address.addressLine1,
      address.addressLine2,
      address.city,
      address.state,
      address.postalCode,
      address.country,
    ].filter(Boolean);
    return parts.join(", ");
  };
  const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatusKey = event.target.value;
    const validStatus = OrderManagementConstants.orderStatusFilter.find(
      (statusObj) => statusObj.key === newStatusKey
    );

    if (!validStatus) {
      console.error("Invalid order status selected");
      return;
    }

    // Store the new status
    const newStatusValue = validStatus.label.toUpperCase();    try {
      setUpdatingStatus(true);
      await bazaarApiPost(`/orders/status`, {
        ids: [Number(orderDetails.id)],
        status: newStatusValue
      });
      
      // Update local state to immediately reflect the change in UI
      setCurrentOrderStatus(newStatusValue);
      
      // Call the callback if provided to refresh order list
      if (onOrderStatusUpdate) {
        onOrderStatusUpdate(orderDetails.id, newStatusValue);
      }
    } catch (error) {
      console.error("Failed to update order status", error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const primaryAddress = orderDetails.user?.addresses?.[0];

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="xl">      <DrawerContent>
        <DrawerHeader className="p-6 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Order Details</h2>
          <button 
            onClick={onOpenChange}
            className="text-gray-500 hover:text-gray-700 font-medium"
          >
            Close
          </button>
        </DrawerHeader>

        <DrawerBody>
          <div className="p-6">            {/* User Profile Section */}            <div className="bg-[#F9FAFB] rounded-lg">
              {/* User Info */}
              <div className="flex items-center gap-3 px-6 py-4 bg-[#ECFDF3] rounded-t-lg">
                <img
                  src={
                    orderDetails.user?.UserProfile?.profileImage ||
                    "/images/user/profile-placeholder.png"
                  }
                  alt={orderDetails.user?.UserProfile?.fullName || "User"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {orderDetails.user?.UserProfile?.fullName || "Rajveer Sikhawat"}
                  </h3>
                  <p className="text-sm text-gray-600">Customer</p>
                </div>
              </div>              {/* Contact Details */}
              <div className="space-y-4 px-6 py-5">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Address</p>
                  <p className="text-sm text-gray-700">
                    {primaryAddress ? formatAddress(primaryAddress) : "456, Oak St. #3b, San Francisco CA 94102, United States"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                  <div className="flex items-center">
                    <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <p className="text-sm text-gray-700">
                      {orderDetails.user?.UserProfile?.phoneNumber || "+1 (415) 555-1234"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <p className="text-sm text-gray-700">
                      {orderDetails.user?.email || "rajveer.shk.testmail@gmail.com"}
                    </p>
                  </div>
                </div>
              </div>{/* Order Info */}
              <div className="mt-2 border-t mx-6 pt-4 pb-4">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order Date</p>
                    <p className="text-[15px] font-medium text-gray-900">
                      {formatDate(orderDetails.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <p className="text-[15px] font-medium text-gray-900 font-mono">
                      #{orderDetails.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                    <div className="flex items-center">
                      <div className="w-6 h-6 mr-2">
                        <img src="/images/payment/mastercard.svg" alt="Master Card" className="w-full h-full object-contain" />
                      </div>
                      <p className="text-[15px] font-medium text-gray-900">
                        Master Card
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>            {/* Products Section */}
            <div className="mt-6">              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className="font-[Plus Jakarta Sans] font-semibold text-[18px] leading-[28px] tracking-normal text-gray-900"
                  >
                    Products Bought ({orderDetails.products.length} Items)
                  </span>
                  {orderDetails.paymentStatus && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                      orderDetails.paymentStatus === 'PAID' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                    }`}>
                      {orderDetails.paymentStatus}
                    </span>
                  )}                </div>               <select
              className={`text-sm font-medium text-gray-600 border rounded-md px-2 py-1 ${updatingStatus ? 'opacity-50 cursor-wait' : ''}`}
              value={OrderManagementConstants.orderStatusFilter.find(
                (statusObj) => statusObj.label.toUpperCase() === currentOrderStatus
              )?.key || ""} // Map the current status string to the corresponding dropdown key
              onChange={handleStatusChange}
              disabled={updatingStatus}
            >
              {OrderManagementConstants.orderStatusFilter.map((statusObj) => (
                <option key={statusObj.key} value={statusObj.key}>
                  {statusObj.label}
                </option>
              ))}
            </select>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg">                {orderDetails.products.map((orderProduct, index) => {
                  const product = orderProduct.product;
                  const sellerOrder = orderDetails.SellerOrder?.find(
                    (so) => so.sellerId === product.sellerId
                  );
                  return (
                    <div
                      key={orderProduct.id}
                      className={`${index !== 0 ? 'border-t border-dashed border-gray-200' : ''}`}
                    >
                      <div className="p-6 flex gap-5">
                        {/* Product Image */}
                        <div className="w-[80px] h-[80px] rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                          <img
                            src={product.imageUrl || '/images/placeholder.png'}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          {/* Title */}
                          <h3 className="font-[Plus Jakarta Sans] text-base font-semibold text-[#101828] truncate">
                            {product.title}
                          </h3>
                          {/* Stock Row */}
                          <div className="flex items-center gap-3 mt-1">
                            <span className="font-[Plus Jakarta Sans] text-xs font-semibold text-green-600 px-2 py-0.5 bg-green-50 rounded-full">IN-STOCK</span>
                            <span className="flex items-center gap-1">
                              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-100">
                                <span className="text-xs text-blue-800 font-bold">i</span>
                              </span>
                              <span className="font-[Plus Jakarta Sans] text-xs text-[#1570EF] font-medium">
                                Only {product.availableQuantity || 16} Stocks Left
                              </span>
                            </span>
                          </div>                          {/* Details Rows */}
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center">
                              <p className="font-[Plus Jakarta Sans] text-xs font-semibold text-gray-500 leading-4 w-[100px]">Product SKU/ID:</p>
                              <p className="font-[Plus Jakarta Sans] text-xs font-semibold text-gray-900 leading-4 ml-2">{product.id || '41X-D55-981P-70'}</p>
                            </div>
                            <div className="flex items-center">
                              <p className="font-[Plus Jakarta Sans] text-xs font-semibold text-gray-500 leading-4 w-[100px]">Quantity:</p>
                              <p className="font-[Plus Jakarta Sans] text-xs font-semibold text-gray-900 leading-4 ml-2">{orderProduct.quantity || '01'}</p>
                            </div>
                            <div className="flex items-center">
                              <p className="font-[Plus Jakarta Sans] text-xs font-semibold text-gray-500 leading-4 w-[100px]">Order Status:</p>
                              <div className="flex items-center ml-2">                                <span className={`inline-block w-2 h-2 rounded-full ${
                                  sellerOrder?.status === 'DELIVERED' ? 'bg-green-500' : 
                                  sellerOrder?.status === 'SHIPPED' ? 'bg-blue-500' : 
                                  sellerOrder?.status === 'PROCESSING' ? 'bg-indigo-500' : 'bg-yellow-400'
                                } mr-2`}></span>
                                <span className={`font-[Plus Jakarta Sans] text-xs font-semibold leading-4 ${
                                  sellerOrder?.status === 'DELIVERED' ? 'text-green-500' : 
                                  sellerOrder?.status === 'SHIPPED' ? 'text-blue-500' : 
                                  sellerOrder?.status === 'PROCESSING' ? 'text-indigo-500' : 'text-yellow-500'
                                }`}>
                                  {sellerOrder?.status || 'PENDING'}
                                  {index === 0 && <span className="ml-2 text-xs text-gray-400">(Order: {currentOrderStatus})</span>}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <p className="font-[Plus Jakarta Sans] text-xs font-semibold text-gray-500 leading-4 w-[100px]">Amount Paid:</p>
                              <p className="font-[Plus Jakarta Sans] text-xs font-semibold text-gray-900 leading-4 ml-2">
                                ${orderProduct.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>            {/* Billing Section */}
            <div className="mt-6">
              <div className="bg-white border border-gray-200 rounded-lg">                {/* Subtotal Section */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="font-[Plus Jakarta Sans] font-semibold text-base text-gray-900">
                      Subtotal
                    </h3>
                    <span className="font-[Plus Jakarta Sans] text-base font-semibold text-gray-900 tabular-nums">
                      $ {(orderDetails.totalPrice - orderDetails.shippingCharges + orderDetails.totalPrice * 0.02 - orderDetails.totalPrice * 0.01).toFixed(2)}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-[Plus Jakarta Sans] text-sm text-gray-600">Number of Items:</span>
                      <span className="font-[Plus Jakarta Sans] text-sm font-medium text-gray-900 tabular-nums">
                        {orderDetails.products.length.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-[Plus Jakarta Sans] text-sm text-gray-600">Shipping Charges:</span>
                      <span className="font-[Plus Jakarta Sans] text-sm font-medium text-gray-900 tabular-nums">
                        (+) ${orderDetails.shippingCharges.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-[Plus Jakarta Sans] text-sm text-gray-600">Offer Deduction:</span>
                      <span className="font-[Plus Jakarta Sans] text-sm font-medium text-gray-900 tabular-nums">
                        (-) ${(orderDetails.totalPrice * 0.02).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-[Plus Jakarta Sans] text-sm text-gray-600">Taxes:</span>
                      <span className="font-[Plus Jakarta Sans] text-sm font-medium text-gray-900 tabular-nums">
                        (+) ${(orderDetails.totalPrice * 0.01).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>                {/* Total Billed Amount Section */}
                <div className="border-t border-gray-200 p-6">
                  <div className="flex justify-between items-center">
                    <span className="font-[Plus Jakarta Sans] font-semibold text-[18px] leading-[28px] text-[#004B82]">Total Billed Amount Paid</span>
                    <span className="font-[Plus Jakarta Sans] font-semibold text-[18px] leading-[28px] text-[#004B82] tabular-nums">
                      $ {orderDetails.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>            {/* Order Activity Log */}
            <div className="mt-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-[Plus Jakarta Sans] font-semibold text-base text-gray-900 mb-5">
                  Order Activity Log
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-[Plus Jakarta Sans] text-sm text-gray-600">Order Placed:</span>
                    <span className="font-[Plus Jakarta Sans] text-sm font-medium text-gray-900">
                      {formatDate(orderDetails.createdAt, true) || "17 Apr 2025, 3:45pm"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-[Plus Jakarta Sans] text-sm text-gray-600">Payment Received:</span>
                    <span className="font-[Plus Jakarta Sans] text-sm font-medium text-gray-900">
                      {formatDate(orderDetails.paymentTime, true) || "17 Apr 2025, 3:52pm"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
