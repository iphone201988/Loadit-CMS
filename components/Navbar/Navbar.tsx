import Link from "next/link";
import {
  CarFront,
  DollarSign,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Users,
} from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  return (
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
            <Link href="/pricings">
              <li className="flex justify-center items-center my-4">
                <DollarSign className="mr-2" />
                Manage Pricings
              </li>
            </Link>
            <Link href="/change-password">
              <li className="flex items-center justify-center my-4">
                <LockKeyhole className="mr-2" />
                Change Password
              </li>
            </Link>
            <a href="/logout">
              <li className="flex items-center justify-center my-4">
                <LogOut className="mr-2" />
                Logout
              </li>
            </a>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
