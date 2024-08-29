"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export const getUserPayments = async (
  userId: string,
  page: number,
  limit: number
) => {
  const url = process.env.API_URL!;

  try {
    const token = cookies().get("token")?.value;

    if (!token) redirect("/auth/signin", RedirectType.replace);

    const response = await axios.get(
      `${url}/admin/getUserPayments/${userId}?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.data.success) {
      return {
        status: response.status,
        data: response.data.payments,
        total: response.data.total,
      };
    }

    redirect("/auth/signin", RedirectType.replace);
  } catch (error) {
    redirect("/auth/signin", RedirectType.replace);
  }
};
