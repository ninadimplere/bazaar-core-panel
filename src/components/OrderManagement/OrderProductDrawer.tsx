import { Drawer, DrawerContent, DrawerHeader, DrawerBody } from "@heroui/react";

export default function OrderProductDrawer({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: () => void }) {
  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
      <DrawerContent>
        <DrawerHeader>Order Product Details</DrawerHeader>
        <DrawerBody>
          {/* Placeholder for product details */}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
