"use server";
import { columns } from "./columns";
import TableComponent from "@/components/Table/table";

const Drivers = () => {
  const limit = parseInt(process.env.NEXT_PUBLIC_PAGINATION_LIMIT!) || 5;
  return (
    <TableComponent
      heading="Drivers"
      type="drivers"
      url="/drivers"
      columns={columns}
      limit={limit}
    />
  );
};

export default Drivers;
