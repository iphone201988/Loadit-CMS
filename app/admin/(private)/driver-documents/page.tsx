"use server";
import { columns } from "./columns";
import TableComponent from "@/components/Table/table";

const DriversDocuments = () => {
  const limit = parseInt(process.env.NEXT_PUBLIC_PAGINATION_LIMIT!) || 5;
  return (
    <TableComponent
      heading="Drivers Documents"
      type="driverDocuments"
      url="/admin/drivers"
      columns={columns}
      limit={limit}
    />
  );
};

export default DriversDocuments;
