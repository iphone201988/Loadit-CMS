"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, UserCog } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { getFormattedDate } from "@/lib/utils";
import { changeUserAccountStatus } from "@/actions/customers";
import { toast } from "react-toastify";
import Link from "next/link";

export type CustomersData = {
  id: string;
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
  amountSpent: number;
  status: number;
};

export const columns: ColumnDef<CustomersData>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.getValue("id"),
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
      return (
        <div>
          <StatusToggle id={id} status={status} />
        </div>
      );
    },
  },
  {
    accessorKey: "amountSpent",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount Spent
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amountSpent"));
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
        <div className="flex justify-center">
          <Link href={`/admin/customers/${id}`}>
            <UserCog />
          </Link>
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
