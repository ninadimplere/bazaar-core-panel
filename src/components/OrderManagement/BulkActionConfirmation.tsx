"use client";

import { Button } from "@heroui/react";
import { useEffect, useRef } from "react";

interface BulkActionConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  actionLabel: string;
  itemCount: number;
  isLoading?: boolean;
}

export default function BulkActionConfirmation({
  isOpen,
  onClose,
  onConfirm,
  actionLabel,
  itemCount,
  isLoading = false
}: BulkActionConfirmationProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent scrolling when open
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Format action label for display
  const getDisplayAction = () => {
    // Convert label like 'mark_shipped' to 'Shipped'
    if (actionLabel.startsWith('mark_')) {
      const status = actionLabel.replace('mark_', '');
      return status.charAt(0).toUpperCase() + status.slice(1);
    }
    // Handle other actions like 'export_csv' or 'delete'
    if (actionLabel === 'export_csv') return 'Export';
    if (actionLabel === 'delete') return 'Delete';
    return actionLabel;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div 
        ref={dialogRef}
        className="w-full max-w-md rounded-lg bg-white shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
      >
        <div className="relative p-4">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ×
          </button>
          
          <h2 id="confirmation-title" className="mb-6 text-center text-xl font-bold text-gray-900">
            Bulk Confirmation
          </h2>
          
          <p className="mb-6 text-center text-gray-700">
            You are about to mark {itemCount} orders as {getDisplayAction()}. Would you like to proceed, please confirm?
          </p>
          
          <div className="flex flex-col gap-3">
            <Button
              color="primary"
              onClick={onConfirm}
              className="w-full"
              isLoading={isLoading}
            >
              YES
            </Button>
            <Button
              color="default"
              variant="bordered"
              onClick={onClose}
              className="w-full"
              disabled={isLoading}
            >
              NO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
