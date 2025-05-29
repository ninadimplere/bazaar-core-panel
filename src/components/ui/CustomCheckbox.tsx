import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  label?: string;
  ariaLabel?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  className = "",
  label,
  ariaLabel,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange(newCheckedState);
  };

  return (
    <div
      className={`flex items-center ${className}`}
      onClick={handleClick}
      role="checkbox"
      aria-checked={isChecked}
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent);
        }
      }}
    >
      <div
        className={`h-4 w-4 flex items-center justify-center rounded border ${
          isChecked
            ? "bg-primary border-primary text-white"
            : "border-gray-300 bg-white"
        } cursor-pointer transition-colors`}
      >
        {isChecked && <Check size={12} className="stroke-white" />}
      </div>
      {label && <span className="ml-2 text-sm">{label}</span>}
    </div>
  );
};

export default CustomCheckbox;
