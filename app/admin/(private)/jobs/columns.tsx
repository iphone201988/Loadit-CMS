"use client";

import QuitJobPopup from "@/components/QuitJobPopup/QuitJobPopup";
import { Button } from "@/components/ui/button";
import { getFormattedDate, getFormattedTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Truck } from "lucide-react";
import Link from "next/link";

export type JobsData = {
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

export const columns: ColumnDef<JobsData>[] = [
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
      console.log("pickupDetails::::",pickupDetails)
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
      if (!deliveryStatus) return;
      return (
        <div
          className={`flex items-center justify-center space-x-2 font-bold ${colorsMap[deliveryStatus]}`}
        >
          {deliveryStatus}
          <Truck />
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
      const deliveryStatus: any = row.getValue("deliveryStatus");
      return (
        <div className="flex items-center justify-center space-x-2 font-bold">
          <Link href={`/admin/jobs/${jobId}`}>
            <Button className="bg-orange-500 hover:bg-orange-600">View</Button>
          </Link>
          {deliveryStatus == "IN_PROGRESS" && <QuitJobPopup jobId={jobId} />}
        </div>
      );
    },
  },
];
