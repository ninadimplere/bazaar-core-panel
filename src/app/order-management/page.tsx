"use client";

import Breadcrumb from "@components/Breadcrumbs/Breadcrumb";
import { Tabs, Tab } from "@heroui/tabs";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState<any>("activeOrders");
  const [orderCounts, setOrderCounts] = useState({
    activeOrders: 0,
    returnOrders: 0,
    cancellationRequests: 0,
  });
  return (
    <div className="w-full">
      <Breadcrumb pageName="Orders & Returns" />

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
              key="activeOrders"
              title={`All Products (${orderCounts.activeOrders})`}
            ></Tab>
            <Tab
              key="returnOrders"
              title={`Active Products (${orderCounts.returnOrders})`}
            ></Tab>
            <Tab
              key="cacellationRequests"
              title={`Inactive Products (${orderCounts.cancellationRequests})`}
            ></Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
