import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DollarSign,
  Users,
  CarFront,
  Layers,
  MapPinCheck,
  MapPinX,
  LocateFixed,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface DashboardCardProps {
  heading: string;
  type:
    | "revenue"
    | "users"
    | "drivers"
    | "jobs"
    | "complete"
    | "incomplete"
    | "pending";
  data: string;
  percentageChange: number;
}

const DashboardCard = ({
  heading,
  type,
  data,
  percentageChange,
}: DashboardCardProps) => {
  const iconsMap = {
    revenue: <DollarSign size={18} />,
    users: <Users size={18} />,
    drivers: <CarFront size={18} />,
    jobs: <Layers size={18} />,
    complete: <MapPinCheck size={18} />,
    incomplete: <MapPinX size={18} />,
    pending: <LocateFixed size={18} />,
  };

  const statIcon =
    percentageChange > 0 ? (
      <TrendingUp size={18} color="green" />
    ) : (
      <TrendingDown size={18} color="red" />
    );

  return (
    <div className="mx-5 w-[20rem] max:xl:w-[15rem] mt-5">
      <Card className="w-full shadow">
        <CardHeader className="pt-5 pb-3">
          <CardTitle className="flex justify-between w-full items-center">
            {heading}
            {iconsMap[type]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl">{data}</div>
          <CardDescription className="mt-1 flex items-center space-x-1">
            <span>{statIcon}</span>
            <span>{Math.abs(percentageChange)}% from last month</span>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCard;
