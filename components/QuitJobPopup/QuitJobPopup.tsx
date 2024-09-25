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
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { quitJob } from "@/actions/jobs";

const QuitJobPopup = ({ jobId }: { jobId: string }) => {
  const [message, setMessage] = useState<string>("");

  const handleMessageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage(e.target.value);
  };

  const handleClick = async (e: any) => {
    e.preventDefault();
    const response = await quitJob(jobId, message);
    if (response.status == 200) {
      toast.success(response.message);
      window.location.reload();
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-orange-500 hover:bg-orange-600">
          Cancel job
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-4xl text-orange-500 px-5">
            Are you sure you want to quit this delivery
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-xl px-5 mt-2">
            Please tell us your reason to quit this delivery
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Textarea
          value={message}
          onChange={handleMessageChange}
          className="text-lg outline-none text-gray-500"
          placeholder="Reason to quit delivery"
          rows={5}
        />
        <AlertDialogFooter className="flex sm:justify-center">
          <AlertDialogCancel
            className="bg-[#656565] text-white hover:text-white hover:bg-[#656565]"
            onClick={() => {
              setMessage("");
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-orange-500 hover:bg-orange-600"
            onClick={handleClick}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default QuitJobPopup;
