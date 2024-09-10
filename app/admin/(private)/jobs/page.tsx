"use server";

import TableComponent from "@/components/Table/table";
import { columns } from "./columns";

const Jobs = () => {
  const limit = parseInt(process.env.NEXT_PUBLIC_PAGINATION_LIMIT!) || 5;

  return (
    <TableComponent
      heading="Jobs"
      type="jobs"
      url="/admin/jobs"
      columns={columns}
      limit={limit}
    />
  );
};

export default Jobs;
