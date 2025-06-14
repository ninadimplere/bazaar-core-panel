import { Input } from "@heroui/react";
import { AccountSettingsProps } from "./types";

export default function AccountSettings({
  isEditMode = false,
  accountSettingsData,
  onChange = () => {},
}: AccountSettingsProps) {
  return (
    <div className="w-full rounded-lg bg-white p-3">
      <h1 className="text-2xl font-bold text-black">Account Settings</h1>
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex gap-4">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            type="text"
            isDisabled={!isEditMode}
            value={accountSettingsData.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            isDisabled={!isEditMode}
            value={accountSettingsData.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Input
            label="Phone Number"
            placeholder="Enter your Phone Number"
            type="text"
            isDisabled={!isEditMode}
            value={accountSettingsData.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            autoComplete="current-password"
            isDisabled={!isEditMode}
            value={accountSettingsData.password || ""}
            onChange={(e) => onChange("password", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
