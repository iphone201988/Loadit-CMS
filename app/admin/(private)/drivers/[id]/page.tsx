import DriverDocuments from "@/components/Driver/DriverDocuments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableComponent from "../../../../../components/Table/table";
import { columns } from "./columns";
import { paymentColumns } from "./paymentColumns";

const DriverDetails = ({ params }: { params: { id: string } }) => {
  const userId = params?.id;
  const limit = parseInt(process.env.NEXT_PUBLIC_PAGINATION_LIMIT!) || 5;
  return (
    <>
      <div className="m-5 font-bold text-4xl">Driver Details</div>
      <div className="flex justify-center items-center h-full mx-5">
        <Tabs defaultValue="documents" className="w-full h-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="documents">
            <DriverDocuments id={userId} />
          </TabsContent>

          <TabsContent value="jobs" className="h-full">
            <TableComponent
              type="driverJobs"
              userId={userId}
              url={`/admin/drivers/${userId}`}
              columns={columns}
              limit={limit}
            />
          </TabsContent>
          <TabsContent value="payments" className="h-full">
            <TableComponent
              type="payments"
              userId={userId}
              url={`/admin/drivers/${userId}`}
              columns={paymentColumns}
              limit={limit}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default DriverDetails;
