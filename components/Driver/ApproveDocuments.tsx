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
  btnText,
  type,
  approve,
}: {
  id: string;
  isDocumentsVerified: boolean;
  btnText: string;
  type: number;
  approve: boolean;
}) => {
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();

  const handleOnClick = async (id: string) => {
    setShowLoader(true);
    let url = "";
    let body = {};
    if (type == 1) url = `admin/approveDriverDocuments/${id}`;
    if (type == 2) {
      url = `admin/updateDriverDocuments/${id}`;
      body = { approve };
    }
    const response = await approveDriverVehicleDocuments(url, body);
    setShowLoader(false);
    const message = response.message;
    toast.success(message);
    if (type == 1) {
      router.refresh();
    } else {
      router.push("/admin/driver-documents");
    }
  };
  return (
    <>
      {showLoader && <BeatLoader size={10} color="black" />}
      <Button
        className="bg-orange-500 hover:bg-orange-600 text-white"
        disabled={isDocumentsVerified}
        onClick={() => handleOnClick(id)}
      >
        {btnText}
      </Button>
    </>
  );
};

export default ApproveDocuments;
