"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export const getDashboardStats = async () => {
  const url = process.env.API_URL!;

  try {
    const token = cookies().get("token")?.value;

    if (!token) redirect("/auth/signin", RedirectType.replace);

    const response = await axios.get(`${url}/admin/getDashboardStats`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.success) {
      return {
        status: response.status,
        totalUsers: response.data.totalUsers,
        activeDrivers: response.data.activeDrivers,
        totalJobs: response.data.totalJobs,
        activeCustomers: response.data.activeCustomers,
        pendingJobs: response.data.pendingJobs,
        canceledJobs: response.data.canceledJobs,
        completedJobs: response.data.completedJobs,
        totalUsersChange: response.data.percentageChanges.totalUsersChange,
        activeDriversChange: response.data.percentageChanges.activeDriversChange,
        activeCustomersChange: response.data.percentageChanges.activeCustomersChange,
        totalJobsChange: response.data.percentageChanges.totalJobsChange,
        pendingJobsChange: response.data.percentageChanges.pendingJobsChange,
        canceledJobsChange: response.data.percentageChanges.canceledJobsChange,
        completedJobsChange: response.data.percentageChanges.completedJobsChange,
      };
    }

    redirect("/auth/signin", RedirectType.replace);
  } catch (error) {
    redirect("/auth/signin", RedirectType.replace);
  }
};
