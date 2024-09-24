"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export const getJobs = async (page: number, limit: number, query?: string) => {
  const url = process.env.API_URL;
  try {
    const token = cookies().get("token")?.value;
    if (!token) redirect("/auth/sigin", RedirectType.replace);

    const response = await axios.get(
      `${url}/admin/getJobs?page=${page}&limit=${limit}${
        query ? "&" + query : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      const { jobs, total } = response.data;

      const data = jobs.map((job: any) => ({
        id: job._id,
        title: job.title,
        amount: job.amount,
        pickupDetails: {
          pickUpLocation: job.pickUpLocation,
          pickUpDate: job.pickUpDate,
          pickUpTime: job.pickUpTime,
        },
        dropOffDetails: {
          dropOffDate: job.dropOffDate,
          dropOffTime: job.dropOffTime,
          dropOffs: job.dropOffs,
        },
        jobType: job.jobType,
        orderNo: job.orderNo,
        deliveryStatus: job.deliveryStatus,
      }));

      return {
        status: response.status,
        data,
        total,
      };
    }
    redirect("/auth/sign", RedirectType.replace);
  } catch (error) {
    redirect("/admin/auth/signin", RedirectType.replace);
  }
};

export const getJobDetails = async (jobId: string) => {
  const url = process.env.API_URL!;

  try {
    const token = cookies().get("token")?.value;
    if (!token) redirect("/admin/auth/signin", RedirectType.replace);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${url}/admin/getJobDetails/${jobId}`,
      config
    );

    if (response.data.success) {
      return { status: response.status, job: response.data.job };
    }
    redirect("/admin/auth/sigin", RedirectType.replace);
  } catch (error) {
    redirect("/admin/auth/signin", RedirectType.replace);
  }
};

export const createJobForCustomer = async (data: any, timezone: string) => {
  const url = process.env.API_URL!;
  try {
    const token = cookies().get("token")?.value;
    if (!token) redirect("/admin/auth/signin", RedirectType.replace);

    const config = {
      headers: {
        timezone,
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${url}/admin/createJobForCustomer`,
      data,
      config
    );

    if (response.data.success) {
      return {
        status: response.status,
        message: response.data.message,
      };
    }

    redirect("/admin/auth/signin", RedirectType.replace);
  } catch (error: any) {
    if (error.response.status == 401)
      redirect("/admin/auth/signin", RedirectType.replace);

    // console.log("eror----------", error);
    // console.log("eror----------", error.response.data.message);
    // console.log("eror----------", error.response.status);

    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
};
