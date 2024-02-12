import Footer from "../shared/Footer";

export default function Layout({
  children,
  RightContent,
}: {
  children: React.ReactNode;
  RightContent: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-5 md:col-span-2 bg-primary background-line-wrapper relative">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="flex items-center justify-center md:w-1/2 !w-[317px]">
            <div className="w-full">{children}</div>
          </div>
        </div>
        <Footer />
      </div>
      <div className="col-span-5 md:col-span-3 bg-secondary background-wrapper py-24 md:py-12">
        {RightContent}
      </div>
    </div>
  );
}
