"use client";
import React from "react";

import Paginate from "@/components/Paginate/Paginate";
import {  columns } from "./columns";
import { DataTable } from "./data-table";
import { getAllDrivers } from "@/actions/drivers";
import BeatLoader from "react-spinners/BeatLoader";

const Drivers = () => {
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(1);

  const [showLoader, setShowLoader] = React.useState(true);
  const limit = parseInt(process.env.NEXT_PUBLIC_PAGINATION_LIMIT!) || 5;

  const getData = async (page: number = 1, limit: number = 1) => {
    setShowLoader(true);
    const response = await getAllDrivers(page, limit);
    const { drivers, total } = response.data;

    const data = drivers.map((driver: any) => ({
      id: driver._id,
      imageUrl: driver.driverImage,
      name: driver.name,
      contactInfo: { email: driver.email, phone: driver.phone },
      dob: driver.dob,
      address: {
        state: driver.address.state,
        zipCode: driver.address.zipCode,
        addressZipCode: driver.address.addressZipCode,
        addressType: driver.address.addressType,
      },
      status: driver.status,
      amountEarned: driver.amountEarned,
    }));

    setData(data);
    setTotal(total);
    setShowLoader(false);
  };

  React.useEffect(() => {
    (async () => await getData(page, limit))();
  }, [page]);

  return (
    <>
      {showLoader && (
        <div className="fixed inset-0 z-10 bg-white opacity-70"></div>
      )}
      <div className="w-full h-full relative">
        <div className="font-bold text-4xl my-4">Drivers</div>
        <DataTable columns={columns} data={data} />
        <Paginate
          url="/drivers"
          page={page}
          limit={limit}
          total={total}
          setPage={setPage}
        />
        {showLoader && (
          <div className="absolute left-[50%] top-[50%] z-20">
            <BeatLoader />
          </div>
        )}
      </div>
    </>
  );
};

export default Drivers;
