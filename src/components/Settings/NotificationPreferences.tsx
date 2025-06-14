import { Switch } from "@heroui/react";
import { NotificationPreferencesProps } from "./types";

export default function NotificationPreferences({
  isEditMode,
  notificationPreferencesData,
  onChange,
}: NotificationPreferencesProps) {
  return (
    <div className="mt-4 w-full rounded-lg bg-white p-3">
      <h1 className="text-2xl font-bold text-black">Notication Preferences</h1>
      <div className="mt-4 flex flex-col gap-3">
        <div className="flex w-full items-center justify-between">
          <label className="text-black">Order Updates</label>
          <Switch
            isSelected={notificationPreferencesData.orderUpdates}
            onValueChange={(value) => onChange("orderUpdates", value)}
            isDisabled={!isEditMode}
            color="secondary"
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <label className="text-black">Stock Availability Updates</label>
          <Switch
            isSelected={notificationPreferencesData.stockAvailability}
            onValueChange={(value) => onChange("stockAvailability", value)}
            isDisabled={!isEditMode}
            color="secondary"
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <label className="text-black">Messages/Chats</label>
          <Switch
            isSelected={notificationPreferencesData.messageNotifications}
            onValueChange={(value) => onChange("messageNotifications", value)}
            isDisabled={!isEditMode}
            color="secondary"
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <label className="text-black">Promotions</label>
          <Switch
            isSelected={notificationPreferencesData.promotionalOffers}
            onValueChange={(value) => onChange("promotionalOffers", value)}
            isDisabled={!isEditMode}
            color="secondary"
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <label className="text-black">Weekly Reports</label>
          <Switch
            isSelected={notificationPreferencesData.weeklyReports}
            onValueChange={(value) => onChange("weeklyReports", value)}
            isDisabled={!isEditMode}
            color="secondary"
          />
        </div>
      </div>
    </div>
  );
}
