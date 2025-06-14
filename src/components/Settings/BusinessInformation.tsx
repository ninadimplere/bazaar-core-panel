import { Checkbox, Input } from "@heroui/react";
import { BusinessProfileData, DocumentVerificationData } from "./types";
import { createAddressString } from "@utils/common-utils";

export default function BusinessInformation({
  isEditMode = false,
  businessProfileData,
  documentVerificationData,
}: {
  isEditMode?: boolean;
  businessProfileData: BusinessProfileData;
  documentVerificationData: DocumentVerificationData;
}) {
  return (
    <div className="w-full rounded-lg bg-white p-3">
      <h1 className="text-2xl font-bold text-black">Business Details</h1>
      <div className="mt-3 flex flex-col gap-4">
        <Input
          type="text"
          label="GSTIN/Tax ID"
          placeholder="GSTIN/Tax ID"
          value={businessProfileData.taxId || ""}
          disabled={!isEditMode}
        />
        <Input
          type="text"
          label="Registered Address"
          placeholder="Registered Address"
          value={
            createAddressString(businessProfileData?.registeredAddress) || ""
          }
          disabled={!isEditMode}
        />
      </div>
      <h1 className="mt-4 text-2xl font-bold text-black">Documents Uploaded</h1>
      <div className="mt-3 flex w-full flex-col gap-4">
        <Checkbox
          isSelected={documentVerificationData.gstVerification}
          isDisabled={!isEditMode}
        >
          GST Registration Certificate
        </Checkbox>
        <Checkbox
          isSelected={documentVerificationData.panCard}
          isDisabled={!isEditMode}
        >
          PAN Card (for sole propiertor or LLP)
        </Checkbox>
        <Checkbox
          isSelected={documentVerificationData.businessTaxId}
          isDisabled={!isEditMode}
        >
          Business Tax ID (if outside India)
        </Checkbox>
      </div>
      <h1 className="mt-4 text-2xl font-bold text-black">Bank Details</h1>
      <div className="mt-3 flex flex-col gap-4">
        <Input
          type="text"
          label="Account Holder Name"
          placeholder="Account Holder Name"
          value={businessProfileData.accountHolderName || ""}
          disabled={!isEditMode}
        />
        <Input
          type="text"
          label="Bank Name"
          placeholder="Bank Name"
          value={businessProfileData?.bankName || ""}
          disabled={!isEditMode}
        />
        <Input
          type="text"
          label="Account Number"
          placeholder="Account Number"
          value={businessProfileData?.accountNumber || ""}
          disabled={!isEditMode}
        />
        <Input
          type="text"
          label="IFSC Code"
          placeholder="IFSC Code"
          value={businessProfileData?.ifscCode || ""}
          disabled={!isEditMode}
        />
      </div>
    </div>
  );
}
