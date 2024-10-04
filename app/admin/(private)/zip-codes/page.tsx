"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import TableComponent from "@/components/Table/table";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { addZipCode } from "@/actions/zipcodes";

const ZipCodes = () => {
  const limit = parseInt(process.env.NEXT_PUBLIC_PAGINATION_LIMIT!) || 5;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = e.target.elements;
    const zipCode = formData.zipCode.value;
    const action = formData.action.value;

    if (!zipCode) {
      toast.error("Zip code is required");
      return;
    }

    if (!action) {
      toast.error("Action is required");
      return;
    }

    const response = await addZipCode(zipCode, parseInt(action));

    if (response.status == 201) {
      toast.success(response.message);
      window.location.reload();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div>
      <form
        className="flex items-end w-full space-x-2 my-5"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <label htmlFor="">Zip Code</label>
          <Input placeholder="Enter zipcode" name="zipCode" type="number" />
        </div>
        <div className="w-full">
          <label htmlFor="">Action</label>
          <Select name="action">
            <SelectTrigger className="">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Allow</SelectItem>
              <SelectItem value="2">Restrict</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="bg-orange-500 hover:bg-orange-500">
          Add
        </Button>
      </form>
      <div className="h-full">
        <TableComponent
          heading="Zip Codes"
          type="zipCodes"
          url="/admin/zipCodes"
          columns={columns}
          limit={limit}
        />
      </div>
    </div>
  );
};

export default ZipCodes;
