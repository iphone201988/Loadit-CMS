"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "../Input/Input";
import moment from "moment";

const formSchema = z.object({
  jobTitle: z.string().min(1, {
    message: "Job title cannot be empty.",
  }),
  pickUpLocation: z
    .string()
    .min(1, { message: "Pickup Location cannot be empty" }),
  pickUpDate: z.string().min(1, { message: "Pickup Date cannot be empty" }),
  pickUpTime: z.string().min(1, { message: "Pickup Time cannot be empty" }),
  pickUpByTime: z
    .string()
    .min(1, { message: "Pickup Location cannot be empty" }),
  dropOffLocation: z
    .string()
    .min(1, { message: "Dropoff Location cannot be empty" }),
  dropOffDate: z.string().min(1, { message: "Dropoff Date cannot be empty" }),
  dropOffTime: z.string().min(1, { message: "Dropoff Time cannot be empty" }),
  numberOfItems: z
    .string()
    .min(1, { message: "Number of items cannot be empty" }),
  weightOfItems: z
    .string()
    .min(1, { message: "Weight of items cannot be empty" }),
  lengthOfItems: z
    .string()
    .min(1, { message: "Length of items cannot be empty" }),
  heightOfItems: z
    .string()
    .min(1, { message: "Height of items cannot be empty" }),
  instructions: z.string().min(1, { message: "Instructions cannot be empty" }),
});
const CreateJob = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      pickUpLocation: "",
      pickUpDate: "",
      pickUpTime: "",
      pickUpByTime: "",
      dropOffLocation: "",
      dropOffDate: "",
      dropOffTime: "",
      numberOfItems: "",
      weightOfItems: "",
      lengthOfItems: "",
      heightOfItems: "",
      instructions: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("values::::", values);
    const pickupDateTime = moment
    .utc(values.pickUpDate + " " + values.pickUpTime, "YYYY-MM-DD HH:mm")
    .format("YYYY-MM-DDTHH:mm:ss.SSSZ");

  const pickupByDateTime = moment
    .utc(values.pickUpDate + " " + values.pickUpByTime, "YYYY-MM-DD HH:mm")
    .format("YYYY-MM-DDTHH:mm:ss.SSSZ");

  const dropOffDateTime = moment
    .utc(values.dropOffDate + " " + values.dropOffTime, "YYYY-MM-DD HH:mm")
    .format("YYYY-MM-DDTHH:mm:ss.SSSZ");

    console.log(
      "timestamps:",
      pickupDateTime,
      pickupByDateTime,
      dropOffDateTime
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="flex w-full space-x-3">
          <div className="w-full">
            <InputField
              control={form.control}
              name="jobTitle"
              label="Job Title"
              placeholder="Job Title"
            />
          </div>
          <div className="w-full">
            <InputField
              control={form.control}
              name="pickUpLocation"
              label="Pickup Location"
              placeholder="Pickup Location"
            />
          </div>
          <div className="w-full">
            <InputField
              control={form.control}
              name="pickUpDate"
              label="Pickup Date"
              placeholder="Pickup Date"
              type="date"
            />
          </div>
        </div>

        <div className="flex w-full space-x-3">
          <div className="w-full">
            <InputField
              control={form.control}
              name="pickUpTime"
              label="Pickup Time"
              placeholder="Pickup Time"
              type="time"
            />
          </div>
          <div className="w-full">
            <InputField
              control={form.control}
              name="pickUpByTime"
              label="Pickup By Time"
              placeholder="Pickup By Time"
              type="time"
            />
          </div>
          <div className="w-full">
            <InputField
              control={form.control}
              name="dropOffLocation"
              label="DropOff Location"
              placeholder="DropOff Location"
            />
          </div>
        </div>

        <div className="flex w-full space-x-3">
          <div className="w-full">
            <InputField
              control={form.control}
              name="dropOffDate"
              label="DropOff Date"
              placeholder="DropOff Date"
              type="date"
            />
          </div>
          <div className="w-full">
            <InputField
              control={form.control}
              name="dropOffTime"
              label="DropOff Time"
              placeholder="DropOff Time"
              type="time"
            />
          </div>
          <div className="w-full">
            <InputField
              control={form.control}
              name="numberOfItems"
              label="Number of items"
              placeholder="Number of items"
              type="number"
            />
          </div>
        </div>

        <div className="flex w-full space-x-3">
          <div className="w-full">
            <InputField
              control={form.control}
              name="weightOfItems"
              label="Weight of items"
              placeholder="Weight of items"
              type="number"
            />
          </div>
          <div className="w-full">
            <InputField
              control={form.control}
              name="lengthOfItems"
              label="Length of items"
              placeholder="Length of items"
              type="number"
            />
          </div>
          <div className="w-full">
            <InputField
              control={form.control}
              name="heightOfItems"
              label="Height of items"
              placeholder="Height of items"
              type="number"
            />
          </div>
        </div>

        <div className="flex w-full space-x-3">
          <div className="w-full">
            <InputField
              control={form.control}
              name="instructions"
              label="Instructions"
              placeholder="Instructions"
            />
          </div>
        </div>

        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateJob;
