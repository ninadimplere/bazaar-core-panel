import { PermissionConfig } from "@utils/constants";
import {
  AnalyticsReportsIcon,
  ChatsMessagesIcon,
  CustomersIcon,
  OrdersReturnsIcon,
  OverviewIcon,
  ProductManagementIcon,
  PromotionsDiscountsIcon,
  ReviewsRatingsIcon,
} from "./icons";
import { all } from "axios";
import { Aperture, ChartColumnStacked } from "lucide-react";

export const sideNavMenuItems = [
  {
    href: "/overview",
    icon: OverviewIcon,
    label: "Overview",
    allowedRoles: [PermissionConfig.ADMIN, PermissionConfig.SELLER],
  },
  {
    href: "/order-management",
    icon: OrdersReturnsIcon,
    label: "Orders & Returns",
    allowedRoles: [
      PermissionConfig.ADMIN,
      PermissionConfig.SELLER,
      PermissionConfig.BUYER,
    ],
  },
  {
    href: "/product-management",
    icon: ProductManagementIcon,
    label: "Product Management",
    allowedRoles: [PermissionConfig.ADMIN, PermissionConfig.SELLER],
  },
  {
    href: "/analytics-reports",
    icon: AnalyticsReportsIcon,
    label: "Analytics/Reports",
    allowedRoles: [PermissionConfig.ADMIN, PermissionConfig.SELLER],
  },
  {
    href: "/promotions-discounts",
    icon: PromotionsDiscountsIcon,
    label: "Promotions & Discounts",
    allowedRoles: [PermissionConfig.ADMIN, PermissionConfig.SELLER],
  },
  {
    href: "/customers",
    icon: CustomersIcon,
    label: "Customers",
    allowedRoles: [PermissionConfig.ADMIN, PermissionConfig.SELLER],
  },
  {
    href: "/chats-messages",
    icon: ChatsMessagesIcon,
    label: "Chats & Messages",
    allowedRoles: [PermissionConfig.ADMIN, PermissionConfig.SELLER],
  },
  {
    href: "/review-ratings",
    icon: ReviewsRatingsIcon,
    label: "Review & Ratings",
    allowedRoles: [PermissionConfig.ADMIN, PermissionConfig.SELLER],
  },
  {
    href: "/brand-management",
    icon: Aperture,
    label: "Brand Management",
    allowedRoles: [PermissionConfig.ADMIN, PermissionConfig.SELLER],
  },
  {
    href: "/category-management",
    icon: ChartColumnStacked,
    label: "Category Management",
    allowedRoles: [PermissionConfig.ADMIN, PermissionConfig.SELLER],
  },
];
