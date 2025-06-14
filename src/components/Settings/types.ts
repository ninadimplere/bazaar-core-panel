import { Address } from "@/types/common-types";

export type AccountSettingsProps = {
  isEditMode: boolean;
  accountSettingsData: AccountSettingsData;
  onChange: (field: string, value: string) => void;
};

export type AccountSettingsData = {
  name: string | undefined | null;
  email: string | undefined | null;
  phone: string | undefined | null;
  password: string | undefined | null;
};

export type NotificationPreferencesData = {
  orderUpdates: boolean;
  stockAvailability: boolean;
  messageNotifications: boolean;
  promotionalOffers: boolean;
  weeklyReports: boolean;
};

export type NotificationPreferencesProps = {
  notificationPreferencesData: NotificationPreferencesData;
  onChange: (field: string, value: boolean) => void;
  isEditMode?: boolean;
};

export type StoreProfileData = {
  storeName: string | undefined | null;
  storeDescription: string | undefined | null;
  websiteLink: string | undefined | null;
};

export type BusinessProfileData = {
  taxId: string | undefined | null;
  registeredAddress: Address;
  accountHolderName: string | undefined | null;
  bankName: string | undefined | null;
  accountNumber: string | undefined | null;
  ifscCode: string | undefined | null;
};

export type DocumentVerificationData = {
  gstVerification: boolean;
  panCard: boolean;
  businessTaxId: boolean;
};
