"use client";

import Breadcrumb from "@components/Breadcrumbs/Breadcrumb";
import { Tabs, Tab } from "@heroui/tabs";
import { bazaarApiGet } from "@utils/api-helper";
import { useEffect, useState } from "react";
import { endpoints } from "./service";

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
        url = `${endpoints.products}?stock=lowstock`;
        break;
      default:
        url = endpoints.products;
        break;
    }
    bazaarApiGet(url).then((res) => {
      console.log("Product counts:", res);
    });
  }, [activeTab]);

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
