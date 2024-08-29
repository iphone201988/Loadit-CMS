"use client";
import React from "react";
import { Switch } from "@radix-ui/react-switch";
import { changeUserAccountStatus } from "@/actions/customers";
import { toast } from "react-toastify";

const StatusToggle: React.FC<{ id: string; status: number }> = ({
  id,
  status,
}) => {
  const [isChecked, setIsChecked] = React.useState(status === 1);

  const handleOnChange = async (newStatus: boolean) => {
    const response = await changeUserAccountStatus(id, newStatus ? 1 : 2);
    toast.success(response?.message);
    setIsChecked(newStatus);
  };

  return (
    <Switch
      checked={isChecked}
      onCheckedChange={(newStatus) => handleOnChange(newStatus)}
      className="data-[state=checked]:bg-orange-500"
    />
  );
};

export default StatusToggle;
