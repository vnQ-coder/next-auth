import React, { ReactNode, use } from "react";
import { Toaster } from "react-hot-toast";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { getLocale } from "next-intl/server";

interface LayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  const locale = use(getLocale());
  return (
    <div className="flex h-screen w-full p-4 gap-4">
      <Toaster />
      <aside className="w-68">
        <Sidebar locale={locale} />
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden gap-4">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
