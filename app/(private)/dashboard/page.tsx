"use client";
import { getDashboardStats } from "@/actions/dashboard";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Dashboard = () => {
  const [response, setResponse] = useState<any>(null);
  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const response = await getDashboardStats();
      setResponse(response);
      setShowLoader(false);
    })();
  }, []);

  return (
    <div className={`w-full ${showLoader && "h-full"}`}>
      <h1 className="font-bold text-4xl my-4">Dashboard</h1>
      {showLoader && (
        <div className="flex justify-center items-center h-full">
          <BeatLoader />
        </div>
      )}
      {response && (
        <div className="flex w-full flex-wrap mt-5 justify-center">
          <DashboardCard
            heading="Total revenue"
            type="revenue"
            data="$1245"
            percentageChange={response?.totalUsersChange}
          />
          <DashboardCard
            heading="Total users"
            type="users"
            data={response?.totalUsers}
            percentageChange={response?.totalUsersChange}
          />
          <DashboardCard
            heading="Active Drivers"
            type="drivers"
            data={response?.activeDrivers}
            percentageChange={response?.activeDriversChange}
          />
          <DashboardCard
            heading="Active Customers"
            type="users"
            data={response?.activeCustomers}
            percentageChange={response?.activeCustomersChange}
          />
          <DashboardCard
            heading="Total jobs"
            type="jobs"
            data={response?.totalJobs}
            percentageChange={response?.totalJobsChange}
          />
          <DashboardCard
            heading="Pending jobs"
            type="pending"
            data={response?.pendingJobs}
            percentageChange={response?.pendingJobsChange}
          />
          <DashboardCard
            heading="Completed jobs"
            type="complete"
            data={response?.completedJobs}
            percentageChange={response?.completedJobsChange}
          />
          <DashboardCard
            heading="Cancelled jobs"
            type="incomplete"
            data={response?.canceledJobs}
            percentageChange={response?.canceledJobsChange}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
