"use client";

import DashboardCard from "./DashboardCard";


const DashboardStats = ({
  statsResponse: response,
}: {
  statsResponse: any;
}) => {
  return (
    <div className="w-full">
      <h1 className="font-bold text-4xl my-4">Dashboard</h1>
      {response && (
        <div className="flex w-full flex-wrap mt-5 justify-center">
          <DashboardCard
            heading="Total amount spent"
            type="revenue"
            data={`$ ${response?.totalPayments}`}
            percentageChange={response?.totalPaymentsChange}
          />
          <DashboardCard
            heading="Total users"
            type="users"
            data={response?.totalUsers}
            percentageChange={response?.totalUsersChange}
          />
          <DashboardCard
            heading="Active drivers"
            type="drivers"
            data={response?.activeDrivers}
            percentageChange={response?.activeDriversChange}
          />
          <DashboardCard
            heading="Active customers"
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

export default DashboardStats;
