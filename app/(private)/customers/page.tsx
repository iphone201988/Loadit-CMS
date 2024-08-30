"use server";

import TableComponent from "@/components/Table/table";
import { columns } from "./columns";

const Customers = () => {
  const limit = parseInt(process.env.NEXT_PUBLIC_PAGINATION_LIMIT!) || 5;

  return (
      <TableComponent
        heading="Customers"
        type="customers"
        url="/customers"
        columns={columns}
        limit={limit}
      />
  );
};

export default Customers;
