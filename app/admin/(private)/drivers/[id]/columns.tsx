"use client";

import { Button } from "@/components/ui/button";
import { getFormattedDate, getFormattedTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Settings2, Truck } from "lucide-react";
import Link from "next/link";

export type DriverJobsData = {
  id: string;
  title: string;
  amount: number;
  pickupDetails: {
    pickUpLocation: string;
    pickupDateTimeStamp: string;
  };
  dropOffDetails: {
    dropOffDateTimeStamp: string;
    dropOffs: string;
  };
  jobType: string;
  orderNo: string;
  deliveryStatus: string;
};

export const columns: ColumnDef<DriverJobsData>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.getValue("id"),
  },
  {
    accessorKey: "orderNo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order No.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue("orderNo"),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "pickupDetails",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pick up details
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const pickupDetails: any = row.getValue("pickupDetails");
      return (
        <div>
          <div>
            <strong>Pickup Date:</strong>
            {getFormattedDate(pickupDetails.pickupDateTimeStamp)}
          </div>
          <div>
            <strong>Pickup Time:</strong>
            {getFormattedTime(pickupDetails.pickupDateTimeStamp)}
          </div>
          <div>
            <strong>Pickup Location:</strong> {pickupDetails.pickUpLocation}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "dropOffDetails",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DropOff details
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dropOffDetails: any = row.getValue("dropOffDetails");

      return (
        <div>
          <div>
            <strong>DropOff Date:</strong>
            {getFormattedDate(dropOffDetails.dropOffDateTimeStamp)}
          </div>
          <div>
            <strong>DropOff Time:</strong>
            {getFormattedTime(dropOffDetails.dropOffDateTimeStamp)}
          </div>
          {dropOffDetails.dropOffs.length == 1 ? (
            <div>
              <strong>DropOff Location:</strong>
              {dropOffDetails.dropOffs[0].dropOffLocation}
            </div>
          ) : (
            dropOffDetails.dropOffs.map((dropOff: any, i: number) => (
              <div key={i}>
                <strong>DropOff Location {i + 1}:</strong>{" "}
                {dropOff.dropOffLocation}
              </div>
            ))
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "jobType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Job Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const jobType: string = row.getValue("jobType");
      return <div className="font-bold">{jobType}</div>;
    },
  },
  {
    accessorKey: "deliveryStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Delivery Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      type DeliveryStatus = "IN_PROGRESS" | "DELIVERED" | "CANCELED";
      const deliveryStatus: DeliveryStatus = row.getValue("deliveryStatus");
      const colorsMap = {
        IN_PROGRESS: "text-purple-800",
        DELIVERED: "text-green-800",
        CANCELED: "text-red-500",
      };
      return (
        <div
          className={`flex items-center justify-center space-x-2 font-bold ${colorsMap[deliveryStatus]}`}
        >
          {deliveryStatus}
          {deliveryStatus && <Truck />}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Actions
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const jobId: string = row.getValue("id");
      return (
        <div className="flex items-center justify-center space-x-2 font-bold">
          <Link href={`/admin/jobs/${jobId}`}>
            <Settings2 />
          </Link>
        </div>
      );
    },
  },
];
