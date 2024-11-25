import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const DashboardCharts = ({ chartData }: { chartData: any }) => {
  const chartConfig = {
    jobs: {
      label: "Jobs",
      color: "#f97316",
    },
    payments: {
      label: "Payments",
      color: "#ea580c",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} horizontal={true} />
        <XAxis
          dataKey="month"
          tickLine={true}
          tickMargin={10}
          axisLine={true}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          dataKey="payments"
          tickLine={true}
          tickMargin={10}
          axisLine={true}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="jobs" fill="var(--color-jobs)" radius={4} />
        <Bar dataKey="payments" fill="var(--color-payments)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default DashboardCharts;
