"use client";
import React from "react";
import { Switch } from "@radix-ui/react-switch";

const StatusToggle: React.FC<{ id: string; status: number }> = ({
  id,
  status,
}) => {
  const [isChecked, setIsChecked] = React.useState(status === 1);

  return (
    <Switch
      checked={isChecked}
      onCheckedChange={(newStatus) => setIsChecked(newStatus)}
      className="data-[state=checked]:bg-orange-500"
    />
  );
};

export default StatusToggle;
