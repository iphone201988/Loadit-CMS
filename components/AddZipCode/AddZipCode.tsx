import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { quitJob } from "@/actions/jobs";
import { Input } from "../ui/input";

const AddZipCode = () => {
  const [zipCode, setZipCode] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("data:", e.target);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-orange-500 hover:bg-orange-600">
          Add ZipCode
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-4xl text-orange-500 px-5">
            Add ZipCode
          </AlertDialogTitle>
          {/* <AlertDialogDescription className="text-center text-xl px-5 mt-2">
            Please tell us your reason to quit this delivery
          </AlertDialogDescription> */}
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
          <label htmlFor="zipCode">Zip Code</label>
          <Input placeholder="Enter zipcode" name="zipCode" />
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

          <AlertDialogFooter className="flex sm:justify-center">
            <AlertDialogCancel className="bg-[#656565] text-white hover:text-white hover:bg-[#656565]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-orange-500 hover:bg-orange-600">
              Add
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddZipCode;
