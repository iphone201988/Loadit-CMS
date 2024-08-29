"use server";
import { getDriverVehicleDocuments } from "@/actions/drivers";
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
import ApproveDocuments from "./ApproveDocuments";

const DriverDocuments = async ({ id }: { id: string }) => {
  const driverDocuments = await getDriverVehicleDocuments(id);
  const data = driverDocuments.data.driver;

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Driver vehichle documents</CardTitle>
          <CardDescription>Approve driver vehicle documents</CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex flex-col space-y-5">
            <div className="flex space-x-5">
              <div className="w-full">
                <label htmlFor="carInsuranceNumber">Car Insurance Number</label>
                <Input
                  name="carInsuranceNumber"
                  disabled
                  value={data?.carInsuranceNumber}
                />
              </div>
              <div className="w-full">
                <label htmlFor="carInsuranceNumberExpDate">
                  Car Insurance Expiry Date
                </label>
                <Input
                  name="carInsuranceNumberExpDate"
                  disabled
                  value={data?.carInsuranceNumberExpDate}
                />
              </div>
            </div>
            <div className="flex space-x-5">
              <div className="w-full">
                <label htmlFor="drivingLicenseNumber">
                  Driving License Number
                </label>
                <Input
                  name="drivingLicenseNumber"
                  disabled
                  value={data?.drivingLicenseNumber}
                />
              </div>
              <div className="w-full">
                <label htmlFor="licensePlate">License Plate</label>
                <Input
                  name="licensePlate"
                  disabled
                  value={data?.licensePlate}
                />
              </div>
            </div>
            <div className="flex space-x-5">
              <div className="w-full">
                <label htmlFor="socialSecurityNumber">
                  Social Security Number
                </label>
                <Input
                  name="socialSecurityNumber"
                  disabled
                  value={data?.socialSecurityNumber}
                />
              </div>

              <div className="w-full">
                <label htmlFor="vehicleNumber">Vehicle Number</label>
                <Input
                  name="vehicleNumber"
                  disabled
                  value={data?.vehicleNumber}
                />
              </div>
            </div>

            <div className="flex space-x-5">
              <div className="w-full">
                <label htmlFor="socialSecurityNumber">
                  Car Insurance Image
                </label>
                <Image
                  src={data?.carInsuranceImage}
                  alt="carInsuranceImage"
                  width={200}
                  height={200}
                  className="w-[300px] h-[200px] object-contain bg-zinc-100"
                />
              </div>

              <div className="w-full">
                <label htmlFor="socialSecurityNumber">
                  Driving License Image
                </label>
                <Image
                  src={data?.drivingLicenseImage}
                  alt="drivingLicenseImage"
                  width={200}
                  height={200}
                  className="w-[300px] h-[200px] object-contain bg-zinc-100"
                />
              </div>
              <div className="w-full">
                <label htmlFor="vehicleImage">Vehicle Image</label>
                <Image
                  src={data?.vehicleImage}
                  alt="vehicleImage"
                  width={200}
                  height={200}
                  className="w-[300px] h-[200px] object-contain bg-zinc-100"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <ApproveDocuments
            id={data?._id}
            isDocumentsVerified={data?.isDocumentsVerified}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default DriverDocuments;
