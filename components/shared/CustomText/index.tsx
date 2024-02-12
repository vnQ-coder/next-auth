import React, { ReactNode, MouseEvent } from "react";

interface CustomTextProps {
  size?: string;
  weight?: string;
  text?: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  whiteSpace?: string;
  overFlow?: string;
  ellipsis?: string;
  children?: ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({
  size = "text-base",
  weight = "font-normal",
  text = "",
  className = "",
  onClick = () => {},
  whiteSpace = "whitespace-nowrap",
  overFlow = "overflow-hidden",
  ellipsis = "text-ellipsis",
  children,
}) => {
  return (
    <div
      className={`${ellipsis} ${overFlow} ${whiteSpace} ${size} ${weight} ${className}`}
      onClick={onClick}
    >
      {text !== "" && text !== undefined && text !== null ? text : children}
    </div>
  );
};

export default CustomText;
