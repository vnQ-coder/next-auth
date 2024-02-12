"use client";

import CustomText from "../../shared/CustomText";

export default function LeftContent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <CustomText
        onClick={() => {}}
        size="text-3xl"
        weight="font-bold"
        className="mb-1 mt-2 !text-secondary dark:text-fontBasePrimary"
      >
        {title}
      </CustomText>
      <CustomText
        size="text-[14px]"
        weight="font-semibold"
        className=" flex flex-wrap !text-secondary dark:text-fontBasePrimary !whitespace-normal"
      >
        {description}
      </CustomText>
      <div className="h-8" />
    </div>
  );
}
