"use client";

import { Button } from "@/components/ui/button";
import InputField from "../Input/Input";
import moment from "moment-timezone";
import DropOffs from "./DropOffs";
import { getUTCTimestamp } from "@/lib/utils";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import MapInput from "../Map/Map";
import { createJobForCustomer } from "@/actions/jobs";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";

const initialDropOffState = {
  dropOffLocation: "",
  dropOffLongitude: "",
  dropOffLatitude: "",
  numberOfItems: "",
  weightOfItems: "",
  lengthOfItems: "",
  heightOfItems: "",
  instructions: "",
};

const CreateJob = ({ userId }: { userId: string }) => {
  const [formValues, setFormValues] = useState<any>({});
  const [dropOffs, setDropOffs] = useState([initialDropOffState]);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const pickupDateTimeStamp = getUTCTimestamp(
      formValues.pickUpDate + " " + formValues.pickUpTime
    );
    const pickupByDateTimeStamp = getUTCTimestamp(
      formValues.pickUpDate + " " + formValues.pickUpByTime
    );
    const dropOffDateTimeStamp = getUTCTimestamp(
      formValues.dropOffDate + " " + formValues.dropOffTime
    );

    if (!pickupDateTimeStamp) {
      toast.error("Please enter valid Pickup date and time");
      return;
    }
    if (!pickupByDateTimeStamp) {
      toast.error("Please enter valid Pickup by time");
      return;
    }
    if (!dropOffDateTimeStamp) {
      toast.error("Please enter valid Dropoff date and time");
      return;
    }
    const data = {
      ...formValues,
      customerId: userId,
      pickupDateTimeStamp: pickupDateTimeStamp,
      pickupByDateTimeStamp: pickupByDateTimeStamp,
      dropOffDateTimeStamp: dropOffDateTimeStamp,
      dropOffDate: undefined,
      dropOffTime: undefined,
      pickUpByTime: undefined,
      pickUpDate: undefined,
      pickUpTime: undefined,
      dropOffs,
      jobType: dropOffs.length > 1 ? 2 : 1,
    };

    const timezone = moment.tz.guess();
    setShowLoader(true);
    const response = await createJobForCustomer(data, timezone);
    setShowLoader(false);

    if (response.status != 201) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      window.location.reload();
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8 w-full">
      {showLoader && (
        <div className="fixed inset-0 z-10 bg-white opacity-70"></div>
      )}
      <div className="flex w-full space-x-3">
        <div className="w-full">
          <InputField
            name="title"
            label="Job Title"
            placeholder="Job Title"
            value={formValues?.title}
            handleChange={(e: any) => {
              setFormValues({ ...formValues, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <div className="w-full relative">
          <MapInput
            name="pickUpLocation"
            label="Pickup Location"
            placeholder="Pickup Location"
            handleChange={(location: string, lat: string, lng: string) => {
              setFormValues({
                ...formValues,
                pickUpLocation: location,
                pickUpLongitude: lng.toString(),
                pickUpLatitude: lat.toString(),
              });
            }}
          />
        </div>
      </div>

      <div className="flex w-full space-x-3">
        <div className="w-full">
          <InputField
            name="pickUpDate"
            label="Pickup Date"
            placeholder="Pickup Date"
            type="date"
            value={formValues?.pickUpDate}
            handleChange={(e: any) => {
              setFormValues({ ...formValues, [e.target.name]: e.target.value });
            }}
          />
        </div>

        <div className="w-full">
          <InputField
            name="pickUpTime"
            label="Pickup Time"
            placeholder="Pickup Time"
            type="time"
            value={formValues?.pickUpTime}
            handleChange={(e: any) => {
              setFormValues({ ...formValues, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <div className="w-full">
          <InputField
            name="pickUpByTime"
            label="Pickup By Time"
            placeholder="Pickup By Time"
            type="time"
            value={formValues?.pickUpByTime}
            handleChange={(e: any) => {
              setFormValues({ ...formValues, [e.target.name]: e.target.value });
            }}
          />
        </div>

        <div className="w-full">
          <InputField
            name="dropOffDate"
            label="DropOff Date"
            placeholder="DropOff Date"
            type="date"
            value={formValues?.dropOffDate}
            handleChange={(e: any) => {
              setFormValues({ ...formValues, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <div className="w-full">
          <InputField
            name="dropOffTime"
            label="DropOff Time"
            placeholder="DropOff Time"
            type="time"
            value={formValues?.dropOffTime}
            handleChange={(e: any) => {
              setFormValues({ ...formValues, [e.target.name]: e.target.value });
            }}
          />
        </div>
      </div>

      {dropOffs.map((dropOff, index) => (
        <DropOffs
          key={index}
          dropOff={dropOff}
          index={index}
          setDropOffs={setDropOffs}
          allDropOffs={dropOffs}
        />
      ))}

      <div className="flex items-center space-x-1">
        <CirclePlus />
        <button
          type="button"
          onClick={() => {
            setDropOffs([...dropOffs, { ...initialDropOffState }]);
          }}
        >
          Add dropOff location
        </button>
      </div>

      <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
        Submit
      </Button>

      {showLoader && (
        <div className="absolute left-[50%] top-[50%] z-20">
          <BeatLoader />
        </div>
      )}
    </form>
  );
};

export default CreateJob;
