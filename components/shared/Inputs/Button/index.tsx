import { ReactNode, MouseEvent } from "react";

interface ButtonProps {
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  font?: string;
  rounded?: string;
  fontWeight?: string;
  textColor?: string;
  bgColor?: string;
  height?: string;
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  disabled = false,
  type = "button",
  className,
  onClick = () => {},
  font = "sm",
  rounded = "lg",
  fontWeight = "semibold",
  textColor = "text-fontBaseSecondary",
  bgColor = "bg-gradient",
  height = "h-12",
  children,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`p-2 flex items-center justify-center hover:opacity-70 ${height} ${
        disabled ? "opacity-70" : ""
      } rounded-${rounded} text-${font} font-${fontWeight} ${textColor} ${bgColor} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
