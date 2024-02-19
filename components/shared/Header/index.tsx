"use client";
import Breadcrumbs from "../BreadCrumb";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/dark-mode";

export default function Header() {
  const currentPath = usePathname();
  return (
    <Card className="w-full p-4 flex items-center justify-between">
      <Breadcrumbs currentPath={currentPath} />
      <ModeToggle />
    </Card>
  );
}
