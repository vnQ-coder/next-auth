"use client";

import { FC } from "react";
import { Bars } from "react-loader-spinner";

interface LoadingSpinnerProps {
  height?: number;
  width?: number;
  color?: string;
  ariaLabel?: string;
  wrapperStyle?: any;
  wrapperClass?: string;
  visible?: boolean;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  height = 30,
  width = 50,
  color = "#333",
  ariaLabel = "bars-loading",
  wrapperStyle = {},
  wrapperClass = "",
  visible = true,
}) => {
  return (
    <Bars
      height={height}
      width={width}
      color={color}
      ariaLabel={ariaLabel}
      wrapperStyle={wrapperStyle}
      wrapperClass={wrapperClass}
      visible={visible}
    />
  );
};

export default LoadingSpinner;
