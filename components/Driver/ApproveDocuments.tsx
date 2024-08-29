"use client";
import { approveDriverVehicleDocuments } from "@/actions/drivers";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import BeatLoader from "react-spinners/BeatLoader";
import { useState } from "react";
const ApproveDocuments = ({
  id,
  isDocumentsVerified,
}: {
  id: string;
  isDocumentsVerified: boolean;
}) => {
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();

  const handleOnClick = async (id: string) => {
    setShowLoader(true);
    const response = await approveDriverVehicleDocuments(id);
    setShowLoader(false);
    const message = response.message;
    toast.success(message);
    router.refresh();
  };
  return (
    <>
      {showLoader && <BeatLoader size={10} color="black" />}
      <Button
        className="bg-orange-500 hover:bg-orange-600 text-white"
        disabled={isDocumentsVerified}
        onClick={() => handleOnClick(id)}
      >
        Approve Documents
      </Button>
    </>
  );
};

export default ApproveDocuments;
