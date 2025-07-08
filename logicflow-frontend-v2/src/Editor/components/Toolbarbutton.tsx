import React from "react";
import type { LucideProps } from "lucide-react";

export const ToolbarButton = ({
  onClick,
  Icon,
  title,
  isActive = false,
  disabled = false,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  isActive?: boolean;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    title={title}
    disabled={disabled}
    className={`p-2 rounded hover:bg-gray-100 transition-colors ${
      isActive ? "bg-blue-100 text-blue-600" : "text-gray-600"
    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    <Icon size={18} />
  </button>
);
