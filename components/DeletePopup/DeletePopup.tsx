import { deleteUser } from "@/actions/common";
import { deleteZipCode } from "@/actions/zipcodes";
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
import { Trash } from "lucide-react";
import { toast } from "react-toastify";

interface DeletePopupProps {
  id: string;
  type: "user" | "zipCode";
}

const DeletePopup = ({ id, type }: DeletePopupProps) => {
  const descMap = {
    user: {
      title: "Are you sure you want to delete this account?",
      description:
        "This action cannot be undone. This will permanently delete user account",
    },
    zipCode: {
      title: "Are you sure you want to delete this zipcode?",
      description:
        "This action cannot be undone. This will permanently delete zipcode",
    },
  };
  const handleClick = async () => {
    let response;
    if (type == "user") response = await deleteUser(id);
    if (type == "zipCode") response = await deleteZipCode(id);

    if (response?.status == 200) {
      toast.success(response.message);
      window.location.reload();
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{descMap[type].title}</AlertDialogTitle>
          <AlertDialogDescription>
            {descMap[type].description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-orange-500 hover:bg-orange-600"
            onClick={handleClick}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePopup;
