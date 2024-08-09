"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export const getAllDrivers = async (page: number, limit: number) => {
  const url = process.env.API_URL;
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      redirect("/auth/sigin", RedirectType.replace);
    }
    const response = await axios.get(
      `${url}/admin/getAllDrivers?page=${page}&&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      return {
        status: response.status,
        data: { drivers: response.data.drivers, total: response.data.total },
      };
    }
    redirect("/auth/sign", RedirectType.replace); 
  } catch (error) {
    redirect("/auth/sign", RedirectType.replace);
  }
};
