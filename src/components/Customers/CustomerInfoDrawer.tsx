import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  select,
} from "@heroui/react";
import { Customer } from "@app/customers/type";
import { createAddressString, formatDate } from "@app/customers/utils";
import { useEffect } from "react";

type CustomerInfoProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedCustomer?: Customer | null;
};

export default function CustomerInfoDrawer({
  isOpen,
  onOpenChange,
  selectedCustomer,
}: CustomerInfoProps) {
  useEffect(() => {}, [selectedCustomer]);

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="mt-10 flex flex-row items-center justify-between gap-1">
              <div className="w-full">
                <div></div>
                <div className="flex w-full items-start justify-center gap-2 border border-gray-200 p-4">
                  <div className="flex w-full flex-col items-start justify-between gap-2 px-4">
                    <div>
                      <label className="text-sm text-gray-5">Address</label>
                      <p className="text-sm">
                        {createAddressString(selectedCustomer?.address!)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-5">
                        Last Order Date
                      </label>
                      <p>{formatDate(selectedCustomer?.lastOrderDate!)}</p>
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-start justify-between gap-2 px-4">
                    <div>
                      <label className="text-sm text-gray-5">
                        Phone Number
                      </label>
                      <p>{selectedCustomer?.number}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-5">
                        Member Since
                      </label>
                      <p>
                        <p>{formatDate(selectedCustomer?.memberSince!)}</p>
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full items-start justify-between gap-2 px-4">
                    <div>
                      <label className="text-sm text-gray-5">Email</label>
                      <p>{selectedCustomer?.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </DrawerHeader>
            <DrawerBody></DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
