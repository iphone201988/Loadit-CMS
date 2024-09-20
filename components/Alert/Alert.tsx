import { deleteUser } from "@/actions/common";
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

const Alert = ({ userId }: { userId: string }) => {
  const handleClick = async () => {
    const response = await deleteUser(userId);
    if (response.status == 200) {
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
          <AlertDialogTitle>
            Are you sure you want to delete this account?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete user
            account
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-orange-500 hover:bg-orange-600"
            onClick={handleClick}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
