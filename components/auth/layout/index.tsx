import { ModeToggle } from "@/components/ui/dark-mode";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Footer from "../shared/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-screen relative">
      <Toaster />
      <section className="absolute top-4 right-4">
        <ModeToggle />
      </section>
      <section className="w-full h-full grid lg:grid-cols-4">
        <div className="lg:col-span-2 w-full h-full flex items-center justify-center">
          <div className="flex w-full flex-col items-center">
            <Image
              src="/images/site-logo.svg"
              width={300}
              height={200}
              alt="logo"
              className="mb-4 p-4"
              loading="eager"
            />
            {children}
          </div>
          <section className="absolute bottom-0 w-full text-center">
            <Footer />
          </section>
        </div>
        <div className="lg:col-span-2 flex bg-primary w-full h-full items-center justify-center p-4">
          <div className="flex flex-col items-center p-8 rounded-lg shadow-lg border">
            <h1 className="text-secondary text-2xl font-bold mb-4">
              Welcome to the Admin Panel
            </h1>
            <p className="text-secondary text-sm">
              Embark on a journey into an exclusive realm crafted just for you!
            </p>
            <p className="text-secondary text-sm mt-4">
              Log in to unlock and experience the distinctive features that
              await you.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
