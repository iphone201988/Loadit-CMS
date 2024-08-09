"use client";
import { getAllCustomers } from "@/actions/customers";
import { CustomersData, columns } from "./columns";
import { DataTable } from "./data-table";
import React from "react";
import Paginate from "@/components/Paginate/Paginate";
import BeatLoader from "react-spinners/BeatLoader";


const Customers = () => {
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(1);

  const [showLoader, setShowLoader] = React.useState(true);
  const limit = parseInt(process.env.NEXT_PUBLIC_PAGINATION_LIMIT!) || 5;

  const getData = async (page: number = 1) => {
    setShowLoader(true);
    const response = await getAllCustomers(page, limit);
    const { customers, total } = response.data;

    const data = customers.map((customer: any) => ({
      id: customer._id,
      name: customer.name,
      contactInfo: { email: customer.email, phone: customer.phone },
      dob: customer.dob,
      address: {
        state: customer.address.state,
        zipCode: customer.address.zipCode,
        addressZipCode: customer.address.addressZipCode,
        addressType: customer.address.addressType,
      },
      status: customer.status,
      amountSpent: customer.amountSpent,
    }));

    setData(data);
    setTotal(total);
    setShowLoader(false);
  };

  React.useEffect(() => {
    (async () => await getData(page))();
  }, [page]);

  return (
    <>
      {showLoader && (
        <div className="fixed inset-0 z-10 bg-white opacity-70"></div>
      )}

      <div className="w-full">
        <div className="font-bold text-4xl my-4">Customers</div>
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

export default Customers;
