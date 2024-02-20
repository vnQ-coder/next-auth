"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { FaRightToBracket } from "react-icons/fa6";

import { usePathname } from "next/navigation";
import { useCallback, useLayoutEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { getSidebarItem } from "./helper";

export default function SidebarClient({ locale }: any) {
  const currentPath = usePathname();
  const [sidebarItems, setSidebarItems] = useState(getSidebarItem(locale));

  const handleClick = useCallback((item: any) => {
    setSidebarItems((prev) =>
      prev.map((d) =>
        d.id === item.id ? { ...d, active: true } : { ...d, active: false }
      )
    );
  }, []);

  useLayoutEffect(() => {
    if (currentPath) {
      setSidebarItems((prev) =>
        prev.map((d) =>
          d.path === currentPath
            ? { ...d, active: true }
            : { ...d, active: false }
        )
      );
    }
  }, []);

  return (
    <Card className="h-full w-64 max-w-[20rem]">
      <div className="flex items-center justify-center w-full border-b-1 px-4 py-3">
        <Image
          src="/images/site-logo.svg"
          width={200}
          height={200}
          alt="logo"
          loading="eager"
        />
      </div>
      <hr />
      <div className="space-y-2 p-4">
        {sidebarItems.map((item, index) => (
          <Link key={index} href={item.path} onClick={() => handleClick(item)}>
            <div
              className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer  text-xs mb-3  ${
                item.active
                  ? "text-secondary bg-primary"
                  : "text-primary hover:bg-secondary hover:text-primary"
              }`}
            >
              {item.icon(
                `h-5 w-5 hover:text-primary ${
                  item.active ? "text-secondary" : "text-primary"
                }`
              )}
              <div className="text-sm">{item.text}</div>
            </div>
          </Link>
        ))}
      </div>
      <hr />
      <div className="space-y-2 mt-2 p-4">
        <div
          className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-secondary text-xs text-primary"
          onClick={() => {
            signOut({ callbackUrl: "http://localhost:3000/en/login" });
          }}
        >
          <FaRightToBracket className="h-5 w-5 text-primary" />
          <span>Logout</span>
        </div>
      </div>
    </Card>
  );
}
