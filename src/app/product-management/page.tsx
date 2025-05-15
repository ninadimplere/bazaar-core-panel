"use client";

import Breadcrumb from "@components/Breadcrumbs/Breadcrumb";
import { Tabs, Tab } from "@heroui/tabs";

export default function Page() {
  return (
    <div className="w-full">
      <Breadcrumb pageName="Product Management" />

      <div className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex w-full flex-col">
          <Tabs
            color="default"
            aria-label="Options"
            selectedKey={"photos"}
            className="w-full bg-none"
          >
            <Tab key="photos" title="Photos"></Tab>
            <Tab key="music" title="Music"></Tab>
            <Tab key="videos" title="Videos"></Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
