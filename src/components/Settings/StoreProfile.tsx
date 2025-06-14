import { Avatar, Input, Link } from "@heroui/react";
import { useState } from "react";
import { StoreProfileData } from "./types";

export default function StoreProfile() {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [storeProfileData, setStoreProfileData] = useState<StoreProfileData>({
    storeName: "",
    storeDescription: "",
    websiteLink: "",
  });

  return (
    <div className="w-full rounded-lg bg-white p-3">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Store Profile</h1>
        {!isEditMode && <Link onClick={() => setIsEditMode(true)}>Edit</Link>}
        {isEditMode && <Link onClick={() => setIsEditMode(false)}>Save</Link>}
      </div>
      <Avatar size="lg" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <div className="mt-4 flex flex-col gap-4">
        <Input
          type="text"
          label="Store Name"
          placeholder="Store Name"
          value={storeProfileData.storeName || ""}
          onChange={(e) =>
            setStoreProfileData({
              ...storeProfileData,
              storeName: e.target.value,
            })
          }
          disabled={!isEditMode}
        />
        <Input
          type="text"
          label="Website Link"
          placeholder="Website Link"
          value={storeProfileData.websiteLink || ""}
          onChange={(e) =>
            setStoreProfileData({
              ...storeProfileData,
              websiteLink: e.target.value,
            })
          }
          disabled={!isEditMode}
        />

        <textarea
          placeholder="Store Description"
          value={storeProfileData.storeDescription || ""}
          onChange={(e) =>
            setStoreProfileData({
              ...storeProfileData,
              storeDescription: e.target.value,
            })
          }
          disabled={!isEditMode}
          className="h-24 w-full rounded border p-2"
        />
      </div>
    </div>
  );
}
