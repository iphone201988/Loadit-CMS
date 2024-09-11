"use client";

import { getChartData, getDashboardStats } from "@/actions/dashboard";
import DashboardCharts from "@/components/Dashboard/DashboardCharts";
import DashboardStats from "@/components/Dashboard/DashboardStats";
import { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Dashboard = () => {
  const [statsResponse, setStatsResponse] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const [dashboardStats, chartData] = await Promise.all([
        getDashboardStats(),
        getChartData(),
      ]);
      // const response = await getDashboardStats();
      setStatsResponse(dashboardStats);
      setChartData(chartData);

      // const chartData = await getChartData();
      // console.log(chartData);
      setShowLoader(false);
    })();
  }, []);

  if (showLoader) {
    return (
      <div className="flex justify-center items-center h-full">
        <BeatLoader />
      </div>
    );
  }

  return (
    <div>
      <div>
        <DashboardStats statsResponse={statsResponse} />
      </div>
      <div className="my-5 h-[80vh]">
        <DashboardCharts chartData={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
