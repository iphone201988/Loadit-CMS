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
import moment from "moment";

// VERIFICATION: 1, REVERIFICATION: 2
// VIEW: 1, VERIFICATION: 2

interface DriverDocumentsProps {
  url: string;
  type: 1 | 2;
}

const DriverDocuments = async ({ url, type }: DriverDocumentsProps) => {
  const driverDocuments = await getDriverVehicleDocuments(url);
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
                  value={moment(data?.carInsuranceNumberExpDate).format(
                    "YYYY-MM-DD"
                  )}
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
                <label htmlFor="drivingLicenseExpDate">
                  Driving License Expiry Date
                </label>
                <Input
                  name="drivingLicenseExpDate"
                  disabled
                  value={moment(data?.drivingLicenseExpDate).format(
                    "YYYY-MM-DD"
                  )}
                />
              </div>
            </div>

            <div className="flex space-x-5">
              <div className="w-full">
                <label htmlFor="licensePlate">License Plate</label>
                <Input
                  name="licensePlate"
                  disabled
                  value={data?.licensePlate}
                />
              </div>
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
            </div>

            <div className="flex space-x-5">
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
              {data?.vehicleImage && (
                <div className="w-full">
                  <label htmlFor="vehicleImage">Vehicle Image</label>
                  <Image
                    src={data.vehicleImage}
                    alt="vehicleImage"
                    width={200}
                    height={200}
                    className="w-[300px] h-[200px] object-contain bg-zinc-100"
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          {type == 2 && (
            <>
              <ApproveDocuments
                id={data?._id}
                isDocumentsVerified={data?.isDocumentsVerified}
                btnText="Disapprove Documents"
                type={type}
                approve={false}
              />
              <ApproveDocuments
                id={data?._id}
                isDocumentsVerified={data?.isDocumentsVerified}
                btnText="Approve Documents"
                type={type}
                approve={true}
              />
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default DriverDocuments;
