"use client";
import { FC } from "react";
import CustomText from "../../shared/CustomText";
import Image from "next/image";

interface RightContentProps {
  title?: string;
  title1?: string;
  title2?: string;
  loginSubTitle?: string;
  loginSubTitle1?: string;
  loginSubTitle2?: string;
  loginSubTitle3?: string;
  description?: string;
}

const RightContent: FC<RightContentProps> = ({
  title,
  title1,
  title2,
  loginSubTitle,
  loginSubTitle1,
  loginSubTitle2,
  loginSubTitle3,
  description,
}) => {
  return (
    <>
      <div className="ml-14">
        <Image src="/images/AuthLogo.svg" width={192} height={200} alt="logo" />
      </div>
      <div className="flex flex-col justify-center ml-14 h-full">
        <CustomText
          size="text-[55.38px]"
          weight="font-semibold"
          whiteSpace="!whitespace-normal"
          className="w-3/5 text-justify text-primary"
        >
          {title}
        </CustomText>

        <CustomText
          size="text-[55.38px]"
          weight="font-light"
          className="flex flex-wrap mt-5 text-primary mr-14"
        >
          {title1}
          <div className="px-3 font-medium whitespace-normal">{title2}</div>
        </CustomText>
        <CustomText
          size="text-[40px]"
          weight="font-light"
          whiteSpace="!whitespace-normal"
          className="flex flex-wrap mt-5 text-primary  mr-14"
        >
          {loginSubTitle}
        </CustomText>

        <CustomText
          size="text-[40px]"
          weight="font-light"
          className="flex flex-wrap mt-5 text-primary  mr-14"
        >
          {loginSubTitle1}
          <div className="px-3 font-medium whitespace-normal">
            {loginSubTitle2}
          </div>
          {loginSubTitle3}
        </CustomText>
        <CustomText
          size="text-[20px]"
          weight="font-normal"
          whiteSpace="!whitespace-normal"
          className=" mt-5 text-justify text-primary mr-14"
        >
          {description}
        </CustomText>
      </div>
    </>
  );
};

export default RightContent;
