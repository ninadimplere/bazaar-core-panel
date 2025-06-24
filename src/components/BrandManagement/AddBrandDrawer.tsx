import { Brand } from "@app/brand-management/type";
import ImageUploadComponent from "@components/Common/ImageUpload/ImageUploadComponent";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { Save, Upload } from "lucide-react";
import { use, useState } from "react";

type AddBrandProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedBrand?: Brand | null;
};

export default function AddBrandDrawer({
  isOpen,
  onOpenChange,
  selectedBrand,
}: AddBrandProps) {
  const editMode = !!selectedBrand;

  const [brand, setBrand] = useState<Brand | null>(selectedBrand || null);
  const categories = [
    { key: "electronics", label: "Electronics" },
    { key: "fashion", label: "Fashion" },
    { key: "home_appliances", label: "Home Appliances" },
    { key: "beauty", label: "Beauty & Personal Care" },
    { key: "sports", label: "Sports & Outdoors" },
    { key: "books", label: "Books" },
    { key: "furniture", label: "Furniture" },
    { key: "groceries", label: "Groceries" },
    { key: "toys", label: "Toys & Games" },
    { key: "automotive", label: "Automotive" },
    { key: "stationery", label: "Stationery & Office Supplies" },
    { key: "pet_supplies", label: "Pet Supplies" },
    { key: "health", label: "Health & Wellness" },
  ];
  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="mt-10 flex flex-row items-center justify-between gap-1">
              <h1 className="text-2xl font-bold text-black">{`${editMode ? "Edit" : "Add"} brand`}</h1>
            </DrawerHeader>
            <DrawerBody>
              <div className="flex flex-col gap-4">
                <Input
                  label="Brand Name"
                  placeholder="Enter Brand Name"
                  type="text"
                  className="bg-white text-black"
                  value={brand?.brandName || ""}
                />
                <Textarea
                  className="w-full"
                  label="Brand Description"
                  isClearable
                  rows={4}
                  placeholder="Enter product description"
                  value={brand?.description || ""}
                />
                <Select placeholder="Choose Category" selectionMode="multiple">
                  {categories.map((category) => (
                    <SelectItem key={category.key}>{category.label}</SelectItem>
                  ))}
                </Select>
                <Button
                  color="default"
                  startContent={<Upload />}
                  variant="solid"
                  onPress={() => {}}
                >
                  Upload brand logo
                </Button>
              </div>
              <div className="mt-4 w-full">
                <Button
                  color="primary"
                  startContent={<Save />}
                  variant="solid"
                  onPress={() => {}}
                  className="w-full"
                >
                  Save brand
                </Button>
              </div>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
