import type { Metadata } from "next";
import "../../globals.css";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Loadit Dashboard",
  description: "Loadit Dashboard",
};

const CommonLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-full flex max-lg:flex-col">
      <Sheet>
        <SheetTrigger className="hidden max-lg:block p-0">
          <div className="border-b p-2 flex justify-start shadow-xl">
            <div className="border border-black p-1 px-2 rounded-sm">
              <div className="w-[20px] bg-black h-[3px] my-1 rounded-lg"></div>
              <div className="w-[20px] bg-black h-[3px] my-1 rounded-lg"></div>
              <div className="w-[20px] bg-black h-[3px] my-1 rounded-lg"></div>
            </div>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 m-0 w-fit border-r-0 sheet">
          <Navbar />
        </SheetContent>
      </Sheet>
      <div className="max-lg:hidden">
        <Navbar />
      </div>
      <div className="p-4 w-[calc(100%-20rem)] max-lg:w-full max-h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default CommonLayout;
