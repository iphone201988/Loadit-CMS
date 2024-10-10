"use server";
import { getJobDetails } from "@/actions/jobs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const JobDetails = async ({ params }: { params: { id: string } }) => {
  const { job } = await getJobDetails(params.id);

  return (
    <div className="h-full w-full flex justify-center ">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Job details</CardTitle>
          {/* <CardDescription>Approve driver vehicle documents</CardDescription> */}
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex flex-col space-y-5">
            <div className="flex space-x-5">
              <div className="w-full">
                <label htmlFor="carInsuranceNumber">Distance</label>
                <Input
                  name="carInsuranceNumber"
                  disabled
                  value={job.distance}
                />
              </div>
              <div className="w-full">
                <label htmlFor="carInsuranceNumber">Amount</label>
                <Input name="carInsuranceNumber" disabled value={job.amount} />
              </div>
            </div>

            <div className="flex space-x-5">
              <div className="w-full">
                <label htmlFor="tax">Tax</label>
                <Input
                  name="tax"
                  disabled
                  value={job.tax}
                />
              </div>

              <div className="w-full">
                <label htmlFor="carInsuranceNumber">Commission</label>
                <Input
                  name="carInsuranceNumber"
                  disabled
                  value={job.commission}
                />
              </div>
            </div>

            <div className="flex space-x-5">
              <div className="w-full">
                <label htmlFor="total">Total</label>
                <Input
                  name="total"
                  disabled
                  value={job.total}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 space-y-5">
              {job?.pickUpImage && (
                <div className="w-full">
                  <label htmlFor="pickupImage">Pickup Image</label>
                  <Image
                    src={job.pickUpImage}
                    alt="pickupImage"
                    width={200}
                    height={200}
                    className="w-[300px] h-[200px] object-contain bg-zinc-100"
                  />
                </div>
              )}

              {job.dropOffs.map((dropOff: any, index: number) => {
                return (
                  <>
                    {dropOff.dropOffImage && (
                      <div className="w-full">
                        <label htmlFor="dropOffImage">
                          DropOff Image
                          {job.dropOffs.length > 1 ? index + 1 : ""}
                        </label>
                        <Image
                          src={dropOff.dropOffImage}
                          alt="dropOffImage"
                          width={200}
                          height={200}
                          className="w-[300px] h-[200px] object-contain bg-zinc-100"
                        />
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end"></CardFooter>
      </Card>
    </div>
  );
};

export default JobDetails;
