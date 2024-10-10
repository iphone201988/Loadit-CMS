"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, BadgeCheck, BadgeX, UserCog } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getFormattedDate } from "@/lib/utils";
import { changeUserAccountStatus } from "@/actions/customers";
import { toast } from "react-toastify";
import DeletePopup from "@/components/DeletePopup/DeletePopup";

export type DriversData = {
  id: string;
  imageUrl: string;
  name: string;
  dob: string;
  contactInfo: {
    email: string;
    phone: string;
  };
  address: {
    state: string;
    zipCode: string;
    addressZipCode: string;
    addressType: number;
  };
  amountEarned: number;
  status: number;
  isDocumentsVerified: boolean;
};

export const columns: ColumnDef<DriversData>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.getValue("id"),
  },
  {
    accessorKey: "imageUrl",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Profile Image
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const imageUrl: any = row.getValue("imageUrl");
      return (
        <div className="flex justify-center">
          <Image
            src={imageUrl}
            alt="profile-image"
            width={50}
            height={50}
            className="w-[50px] h-[50px] rounded-full"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "contactInfo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contact Info
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const contactInfo: any = row.getValue("contactInfo");
      return (
        <div>
          {contactInfo.email && (
            <div>
              <strong>Email:</strong> {contactInfo.email}
            </div>
          )}
          {contactInfo.phone && (
            <div>
              <strong>Phone number:</strong> {contactInfo.phone}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "dob",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date of birth
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dob: string = row.getValue("dob");
      const formattedDate = getFormattedDate(dob);
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const address: any = row.getValue("address");
      return (
        <div>
          <div>
            <strong>State:</strong> {address.state}
          </div>
          <div>
            <strong>Zip code:</strong> {address.zipCode}
          </div>
          {address.addressZipCode && (
            <div>
              <strong>Address zip code:</strong> {address.addressZipCode}
            </div>
          )}
          {address.addressType && (
            <div>
              <strong>Address type:</strong>{" "}
              {address.addressType == 1 ? "Personal use" : "Company use"}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: number = row.getValue("status");
      const id: string = row.getValue("id");
      return <StatusToggle id={id} status={status} />;
    },
  },
  {
    accessorKey: "isDocumentsVerified",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Document verified
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: number = row.getValue("isDocumentsVerified");
      return (
        <div className="flex justify-center">
          {status ? <BadgeCheck color="#1d873c" /> : <BadgeX color="#ff0000" />}
        </div>
      );
    },
  },

  {
    accessorKey: "amountEarned",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount Earned
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amountEarned"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          // className="hover:bg-none! bg-transparent!"
        >
          Actions
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      return (
        <div className="flex justify-center space-x-2">
          <Link href={`/admin/drivers/${id}`}>
            <UserCog />
          </Link>
          <div>
            <DeletePopup id={id} type="user"/>
          </div>
        </div>
      );
    },
  },
];

const StatusToggle: React.FC<{ id: string; status: number }> = ({
  id,
  status,
}) => {
  const [isChecked, setIsChecked] = React.useState(status === 1);

  const handleOnChange = async (newStatus: boolean) => {
    const response = await changeUserAccountStatus(id, newStatus ? 1 : 2);
    toast.success(response?.message);
    setIsChecked(newStatus);
  };

  return (
    <Switch
      checked={isChecked}
      onCheckedChange={(newStatus) => handleOnChange(newStatus)}
      className="data-[state=checked]:bg-orange-500"
    />
  );
};
