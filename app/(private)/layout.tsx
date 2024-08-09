import type { Metadata } from "next";
import "../globals.css";
import Image from "next/image";
import {
  CarFront,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Users,
} from "lucide-react";
import Link from "next/link";

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
    <div className="h-full flex">
      <div className="w-80 h-full bg-orange-500 text-white">
        <div className="flex justify-center items-center bg-zinc-700 p-2">
          <Image
            src="/images/logo.png"
            alt="Loadit logo"
            width={150}
            height={40}
          />
        </div>
        <div className="my-5">
          <ul className="text-xl flex justify-center items-center">
            <div className="flex flex-col items-start">
              <Link href="/dashboard">
                <li className="flex justify-center items-center my-4">
                  <LayoutDashboard className="mr-2" />
                  Dashboard
                </li>
              </Link>
              <Link href="/customers">
                <li className="flex items-center justify-center my-4">
                  <Users className="mr-2" />
                  Customers
                </li>
              </Link>
              <Link href="/drivers">
                <li className="flex justify-center items-center my-4">
                  <CarFront className="mr-2" />
                  Drivers
                </li>
              </Link>
              <Link href="/changePassword">
                <li className="flex items-center justify-center my-4">
                  <LockKeyhole className="mr-2" />
                  Change Password
                </li>
              </Link>
              <Link href="/logout">
                <li className="flex items-center justify-center my-4">
                  <LogOut className="mr-2" />
                  Logout
                </li>
              </Link>
            </div>
          </ul>
        </div>
      </div>
      <div className="p-2 w-[calc(100%-20rem)] h-full">{children}</div>
    </div>
  );
};

export default CommonLayout;
