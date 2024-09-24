"use client";

import { X } from "lucide-react";
import InputField from "../Input/Input";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MapInput from "../Map/Map";
import { Controller } from "react-hook-form";

const DropOffs = ({
  dropOff,
  index,
  setDropOffs,
  allDropOffs,
}: {
  dropOff: any;
  index: number;
  setDropOffs: any;
  allDropOffs: any;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedDropOff = {
      ...dropOff,
      [e.target.name]: e.target.value,
    };

    const updatedDropOffs = [...allDropOffs];
    updatedDropOffs[index] = updatedDropOff;

    console.log("updatedDropOffs:::", updatedDropOffs);

    setDropOffs(updatedDropOffs);
  };

  const handleLocationChange = (location: string, lat: string, lng: string) => {
    const updatedDropOff = {
      ...dropOff,
      dropOffLocation: location,
      dropOffLongitude: lng.toString(),
      dropOffLatitude: lat.toString(),
    };

    const updatedDropOffs = [...allDropOffs];
    updatedDropOffs[index] = updatedDropOff;

    console.log("updatedDropOffs1234:::", updatedDropOffs);

    setDropOffs(updatedDropOffs);
  };

  const handleRemove = (index: number) => {
    const dropOffs = [...allDropOffs];
    const updatedDropOffs = dropOffs.filter((dropOff, i) => i != index);
    setDropOffs(updatedDropOffs);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full justify-between items-center">
          <CardTitle>DropOff Location</CardTitle>
          {index > 0 && (
            <X className="cursor-pointer" onClick={() => handleRemove(index)} />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="flex w-full space-x-3">
            <div className="w-full relative">
              <MapInput
                name="dropOffLocation"
                label="DropOff Location"
                placeholder="DropOff Location"
                handleChange={(location: string, lat: string, lng: string) => {
                  handleLocationChange(location, lat, lng);
                }}
              />
            </div>

            <div className="w-full">
              <InputField
                name="numberOfItems"
                label="Number of items"
                placeholder="Number of items"
                type="number"
                value={dropOff.numberOfItems}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
              />
            </div>

            <div className="w-full">
              <InputField
                name="weightOfItems"
                label="Weight of items"
                placeholder="Weight of items"
                type="number"
                value={dropOff.weightOfItems}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>

          <div className="flex w-full space-x-3">
            <div className="w-full">
              <InputField
                name="lengthOfItems"
                label="Length of items"
                placeholder="Length of items"
                type="number"
                value={dropOff.lengthOfItems}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="w-full">
              <InputField
                name="heightOfItems"
                label="Height of items"
                placeholder="Height of items"
                type="number"
                value={dropOff.heightOfItems}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
              />
            </div>

            <div className="w-full">
              <InputField
                name="instructions"
                label="Instructions"
                placeholder="Instructions"
                value={dropOff.instructions}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DropOffs;
