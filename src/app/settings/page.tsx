"use client";

import Breadcrumb from "@components/Breadcrumbs/Breadcrumb";
import AccountSettings from "@components/Settings/AccountSettings";
import BusinessInformation from "@components/Settings/BusinessInformation";
import NotificationPreferences from "@components/Settings/NotificationPreferences";
import StoreProfile from "@components/Settings/StoreProfile";
import {
  AccountSettingsData,
  BusinessProfileData,
  DocumentVerificationData,
} from "@components/Settings/types";
import { Button } from "@heroui/react";
import { Cog } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [accountSettingsData, setAccountSettingsData] =
    useState<AccountSettingsData>({
      name: "",
      email: "",
      phone: "",
      password: "",
    });

  const [notificationPreferencesData, setNotificationPreferencesData] =
    useState({
      orderUpdates: false,
      stockAvailability: false,
      messageNotifications: false,
      promotionalOffers: false,
      weeklyReports: false,
    });

  const [businessProfileData, setBusinessProfileData] =
    useState<BusinessProfileData>({
      taxId: "",
      registeredAddress: {
        addressLine1: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
      accountHolderName: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
    });

  const [documentVerificationData, setDocumentVerificationData] =
    useState<DocumentVerificationData>({
      gstVerification: true,
      businessTaxId: false,
      panCard: true,
    });

  const handleChangeNotificationPreferences = (
    field: string,
    value: boolean,
  ) => {
    setNotificationPreferencesData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleChangeAccountSettings = (field: string, value: string) => {
    setAccountSettingsData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <Breadcrumb pageName="Settings" />
        {!isEditMode && (
          <Button
            color="secondary"
            startContent={<Cog />}
            variant="solid"
            onPress={() => setIsEditMode(true)}
          >
            EDIT SETTINGS
          </Button>
        )}
        {isEditMode && (
          <Button
            color="secondary"
            startContent={<Cog />}
            variant="solid"
            onPress={() => setIsEditMode(false)}
          >
            SAVE SETTINGS
          </Button>
        )}
      </div>

      <AccountSettings
        isEditMode={isEditMode}
        accountSettingsData={accountSettingsData}
        onChange={handleChangeAccountSettings}
      />

      <div className="mt-4 flex">
        <div className="w-1/2">
          <StoreProfile />
          <NotificationPreferences
            isEditMode={isEditMode}
            notificationPreferencesData={notificationPreferencesData}
            onChange={handleChangeNotificationPreferences}
          />
        </div>
        <div className="w-1/2 pl-4">
          <BusinessInformation
            businessProfileData={businessProfileData}
            isEditMode={isEditMode}
            documentVerificationData={documentVerificationData}
          />
        </div>
      </div>
    </div>
  );
}
