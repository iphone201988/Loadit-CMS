"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export const getAllCustomers = async (page: number, limit: number) => {
  const url = process.env.API_URL;
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      redirect("auth/signin", RedirectType.replace);
    }
    const response = await axios.get(
      `${url}/admin/getAllCustomers?page=${page}&&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success) {
      return {
        status: response.status,
        data: {
          customers: response.data.customers,
          total: response.data.total,
          page: response.data.page,
        },
      };
    }
    redirect("auth/signin", RedirectType.replace);
  } catch (error: any) {
    redirect("auth/signin", RedirectType.replace);
  }
};
