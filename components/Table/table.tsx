"use client";

import { getAllDrivers } from "@/actions/drivers";
import Paginate from "@/components/Paginate/Paginate";
import { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { DataTable } from "./data-table";
import { getAllCustomers } from "@/actions/customers";
import { getUserPayments } from "@/actions/common";
import { getJobs } from "@/actions/jobs";

interface TableProps {
  heading?: string;
  type:
    | "customers"
    | "drivers"
    | "driverJobs"
    | "payments"
    | "customerJobs"
    | "jobs";
  userId?: string;
  url: string;
  columns: any;
  limit: number;
}
const TableComponent = ({
  heading,
  type,
  userId,
  url,
  columns,
  limit,
}: TableProps) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  const [showLoader, setShowLoader] = useState(true);

  const getData = async (page: number = 1) => {
    setShowLoader(true);
    let response;

    if (type == "driverJobs") {
      response = await getJobs(page, limit, `driverId=${userId}`);
    }
    if (type == "customerJobs") {
      response = await getJobs(page, limit, `customerId=${userId}`);
    }
    if (type == "jobs") {
      response = await getJobs(page, limit);
    }
    if (type == "drivers") {
      response = await getAllDrivers(page, limit);
    }
    if (type == "customers") {
      response = await getAllCustomers(page, limit);
    }
    if (type == "payments") {
      response = await getUserPayments(userId!, page, limit);
      console.log("response::::", response);
    }

    console.log("response.data", response?.data);

    setData(response?.data);
    setTotal(response?.total);
    setShowLoader(false);
  };

  useEffect(() => {
    (async () => await getData(page))();
  }, [page]);

  return (
    <>
      {showLoader && (
        <div className="fixed inset-0 z-10 bg-white opacity-70"></div>
      )}

      <div className="w-full h-full relative">
        {heading && <div className="font-bold text-4xl my-4">{heading}</div>}
        {data && (
          <div className="pb-[50px]">
            <DataTable columns={columns} data={data} />
          </div>
        )}
        {data?.length > 0 && (
          <Paginate
            url={url}
            page={page}
            limit={limit}
            total={total}
            setPage={setPage}
          />
        )}
        {showLoader && (
          <div className="absolute left-[50%] top-[50%] z-20">
            <BeatLoader />
          </div>
        )}
      </div>
    </>
  );
};

export default TableComponent;
