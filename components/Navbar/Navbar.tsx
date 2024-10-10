import Link from "next/link";
import {
  BriefcaseBusiness,
  CarFront,
  DollarSign,
  FileStack,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  MapPin,
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
            <Link href="/admin/dashboard">
              <li className="flex justify-center items-center my-4">
                <LayoutDashboard className="mr-2" />
                Dashboard
              </li>
            </Link>
            <Link href="/admin/customers">
              <li className="flex items-center justify-center my-4">
                <Users className="mr-2" />
                Customers
              </li>
            </Link>
            <Link href="/admin/drivers">
              <li className="flex justify-center items-center my-4">
                <CarFront className="mr-2" />
                Drivers
              </li>
            </Link>
            <Link href="/admin/jobs">
              <li className="flex justify-center items-center my-4">
                <BriefcaseBusiness className="mr-2" />
                Jobs
              </li>
            </Link>
            <Link href="/admin/driver-documents">
              <li className="flex justify-center items-center my-4">
                <FileStack className="mr-2" />
                Documents
              </li>
            </Link>
            <Link href="/admin/pricings">
              <li className="flex justify-center items-center my-4">
                <DollarSign className="mr-2" />
                Manage Pricings
              </li>
            </Link>
            <Link href="/admin/zip-codes">
              <li className="flex justify-center items-center my-4">
                <MapPin className="mr-2" />
                Zip Codes
              </li>
            </Link>
            <Link href="/admin/change-password">
              <li className="flex items-center justify-center my-4">
                <LockKeyhole className="mr-2" />
                Change Password
              </li>
            </Link>
            <a href="/admin/logout">
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
