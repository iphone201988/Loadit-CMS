import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableComponent from "../../../../components/Table/table";
import { columns } from "./columns";
import { paymentColumns } from "./paymentColumns";

const CustomerDetails = ({ params }: { params: { id: string } }) => {
  const userId = params?.id;
  const limit = parseInt(process.env.NEXT_PUBLIC_PAGINATION_LIMIT!) || 5;
  return (
    <>
      <div className="m-5 font-bold text-4xl">Customer Details</div>
      <div className="flex justify-center items-center h-full mx-5">
        <Tabs defaultValue="jobs" className="w-full h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="h-full">
            <TableComponent
              type="customerJobs"
              userId={userId}
              url={`/customers/${userId}`}
              columns={columns}
              limit={limit}
            />
          </TabsContent>
          <TabsContent value="payments" className="h-full">
            <TableComponent
              type="payments"
              userId={userId}
              url={`/drivers/${userId}`}
              columns={paymentColumns}
              limit={limit}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default CustomerDetails;
