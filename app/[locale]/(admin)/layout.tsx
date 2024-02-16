import Header from "@/components/shared/Header";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Toaster />
      <Header />
      {children}
    </section>
  );
}
