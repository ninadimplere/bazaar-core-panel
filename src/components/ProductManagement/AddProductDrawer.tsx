import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Input,
  NumberInput,
  Select,
  SelectItem,
  Switch,
  Tab,
  Tabs,
  Textarea,
} from "@heroui/react";

type AddProductProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  addProductActiveStep: number;
  addProductActiveTab: any;
  setAddProductActiveTab: any;
  setAddProductActiveStep: any;
};

export default function AddProductDrawer({
  isOpen,
  onOpenChange,
  addProductActiveStep,
  addProductActiveTab,
  setAddProductActiveTab,
  setAddProductActiveStep,
}: AddProductProps) {
  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="mt-10 flex flex-row items-center justify-between gap-1">
              <h1 className="text-2xl font-bold text-black">Add New Product</h1>
              <h3 className="text-sm">Step {addProductActiveStep} of 2</h3>
            </DrawerHeader>
            <DrawerBody>
              <Tabs
                color="secondary"
                aria-label="Options"
                variant="underlined"
                selectedKey={addProductActiveTab}
                onSelectionChange={(key) => {
                  setAddProductActiveTab(key);
                  console.log(key);
                  if (key === "basicInfo") {
                    setAddProductActiveStep(1);
                  }
                  if (key === "pricing") {
                    setAddProductActiveStep(2);
                  }
                }}
                className="w-full max-w-5xl" // Optional max width
                size="lg"
              >
                <Tab key="basicInfo" title="Basic Info & Update Media">
                  <div>
                    <h1 className="text-xl font-bold text-black">
                      Basic Information
                    </h1>
                    <div className="mt-4 flex w-full flex-col gap-4">
                      <Input
                        label="Product Name"
                        placeholder="Enter product name"
                        type="text"
                        className="bg-white text-black"
                      />
                      <div className="flex gap-4">
                        <Select
                          className="max-w-xs"
                          label="Brand"
                          placeholder="Select a brand"
                        >
                          <SelectItem></SelectItem>
                        </Select>
                        <Select
                          className="max-w-xs"
                          label="Category"
                          placeholder="Select a category"
                        >
                          <SelectItem></SelectItem>
                        </Select>
                      </div>
                      <Textarea
                        className="w-full"
                        label="Product Description"
                        isClearable
                        rows={4}
                        placeholder="Enter product description"
                      />
                      <Select
                        className="w-full"
                        label="Product Status"
                        placeholder="Select product status: Active, Inactive, Draft"
                      >
                        <SelectItem></SelectItem>
                      </Select>
                    </div>
                    <h1 className="mt-6 text-xl font-bold text-black">
                      Upload Product Media
                    </h1>
                    <Button
                      color="secondary"
                      variant="solid"
                      className="mt-4 w-full"
                    >
                      CONTINUE
                    </Button>
                  </div>
                </Tab>
                <Tab
                  key="pricing"
                  title="Pricing, Inventory & Shipping Details"
                >
                  <div>
                    <h1 className="text-xl font-bold text-black">
                      Pricing & Inventory
                    </h1>
                    <div className="mt-4 flex w-full flex-col gap-4">
                      <Input
                        label="SKU"
                        placeholder="Enter SKU"
                        type="text"
                        className="bg-white text-black"
                      />
                      <div className="flex gap-4">
                        <NumberInput
                          startContent={
                            <div className="flex items-center">
                              <label className="sr-only" htmlFor="currency">
                                Currency
                              </label>
                              <select
                                aria-label="Select currency"
                                className="border-0 bg-transparent text-small text-default-400 outline-none"
                                defaultValue="USD"
                                id="currency"
                                name="currency"
                              >
                                <option aria-label="US Dollar" value="USD">
                                  USD
                                </option>
                                <option aria-label="Argentine Peso" value="ARS">
                                  ARS
                                </option>
                                <option aria-label="Euro" value="EUR">
                                  EUR
                                </option>
                              </select>
                            </div>
                          }
                          label="Price"
                          placeholder="0.00"
                        />
                        <Input
                          label="Compare at Price (MRP)"
                          placeholder="Enter Compare at Price (MRP)"
                          type="text"
                          className="bg-white text-black"
                        />
                      </div>
                      <div className="flex gap-4">
                        <Input
                          label="Cost per item"
                          placeholder="Enter Cost per item"
                          type="text"
                          className="bg-white text-black"
                        />
                        <Input
                          label="Discount %"
                          placeholder="Enter Discount %"
                          type="text"
                          className="bg-white text-black"
                        />
                      </div>
                      <NumberInput
                        className="w-full"
                        defaultValue={0}
                        label="Quantity"
                      />
                    </div>
                    <h1 className="mt-6 text-xl font-bold text-black">
                      Shipping Details
                    </h1>
                    <div className="mt-4 flex w-full flex-col gap-4">
                      <Input
                        label="Product Dimensions LxWxH"
                        placeholder="Enter Product Dimensions LxWxH"
                        type="text"
                        className="bg-white text-black"
                        startContent={
                          <div className="flex items-center">
                            <label className="sr-only" htmlFor="currency">
                              Dimensions
                            </label>
                            <select
                              aria-label="Select currency"
                              className="border-0 bg-transparent text-small text-default-400 outline-none"
                              defaultValue="USD"
                              id="currency"
                              name="currency"
                            >
                              <option aria-label="US Dollar" value="CM">
                                CM
                              </option>
                              <option aria-label="Argentine Peso" value="INCH">
                                INCH
                              </option>
                            </select>
                          </div>
                        }
                      />
                      <Select
                        className="w-full"
                        label="Weight in kgs"
                        placeholder="Select product weight in kgs"
                      >
                        <SelectItem></SelectItem>
                      </Select>
                      <Select
                        className="w-full"
                        label="Shipping Class"
                        placeholder="Choose from Light/Bulky/Oversized"
                      >
                        <SelectItem></SelectItem>
                      </Select>
                      <Select
                        className="w-full"
                        label="Delivery Time"
                        placeholder="Select delivery time"
                      >
                        <SelectItem></SelectItem>
                      </Select>
                      <div className="flex items-center gap-4">
                        <Switch defaultSelected size="sm">
                          Out of Stock Alert
                        </Switch>
                        <Switch defaultSelected size="sm">
                          Low Stock Alert
                        </Switch>
                      </div>
                    </div>
                    <Button
                      color="secondary"
                      variant="solid"
                      className="mt-4 w-full"
                    >
                      PUBLISH PRODUCT
                    </Button>
                    <Button
                      color="secondary"
                      variant="bordered"
                      className="mt-4 w-full font-bold text-black"
                    >
                      SAVE AS DRAFT
                    </Button>
                  </div>
                </Tab>
              </Tabs>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
