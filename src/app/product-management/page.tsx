"use client";

import Breadcrumb from "@components/Breadcrumbs/Breadcrumb";
import { Tabs, Tab } from "@heroui/tabs";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState<any>("allproducts");
  const [productCounts, setProductCounts] = useState({
    allProducts: 0,
    activeProducts: 0,
    inactiveProducts: 0,
    draftProducts: 0,
    outOfStockProducts: 0,
    lowStockProducts: 0,
  });
  return (
    <div className="w-full">
      <Breadcrumb pageName="Product Management" />

      <div className="flex max-h-screen w-full flex-col items-center overflow-hidden rounded-[10px] bg-white py-2 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex">
          <Tabs
            color="primary"
            aria-label="Options"
            selectedKey={activeTab}
            onSelectionChange={setActiveTab}
            className="w-full"
            size="lg"
          >
            <Tab
              key="allproducts"
              title={`All Products (${productCounts.allProducts})`}
            ></Tab>
            <Tab
              key="activeproducts"
              title={`Active Products (${productCounts.activeProducts})`}
            ></Tab>
            <Tab
              key="inactiveproducts"
              title={`Inactive Products (${productCounts.inactiveProducts})`}
            ></Tab>
            <Tab
              key="draftproducts"
              title={`Products in Draft (${productCounts.draftProducts})`}
            ></Tab>
            <Tab
              key="outofstockproducts"
              title={`Out of Stock (${productCounts.outOfStockProducts})`}
            ></Tab>
            <Tab
              key="lowstockproducts"
              title={`Low Stock (${productCounts.lowStockProducts})`}
            ></Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
