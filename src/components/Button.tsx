import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        p-2
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${
          outline
            ? "bg-white border-black text-black"
            : "bg-blue-500 border-blue-500 text-white"
        }
        ${
          small
            ? "py-2 text-sm font-light border-[1px]"
            : "text-md font-semibold border-2"
        }
        `}
    >
      {Icon && <Icon size={24} className="absolute left-4 " />}
      {label}
    </button>
  );
};

export default Button;
