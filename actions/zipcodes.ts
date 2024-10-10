"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export const addZipCode = async (zipCode: string, type: number) => {
  const url = process.env.API_URL!;
  try {
    const token = cookies().get("token")?.value;
    if (!token) redirect("/admin/auth/signin", RedirectType.replace);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${url}/admin/addZipCode`,
      { zipCode, type },
      config
    );

    console.log("response:::", response.data);

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

    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
};

export const getZipCodes = async (page: number, limit: number) => {
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
      `${url}/admin/getZipCodes?page=${page}&limit=${limit}`,
      config
    );
    if (response.data.success) {
      return {
        status: response.status,
        data: response.data.zipCodes.map((zipcode: any) => ({
          ...zipcode,
          id: zipcode._id,
        })),
        total: response.data.total,
      };
    }
    redirect("/admin/auth/signin", RedirectType.replace);
  } catch (error) {
    redirect("/admin/auth/signin", RedirectType.replace);
  }
};

export const deleteZipCode = async (zipCodeId: string) => {
  const url = process.env.API_URL!;
  try {
    const token = cookies().get("token")?.value;
    if (!token) redirect("/admin/auth/signin", RedirectType.replace);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(
      `${url}/admin/deleteZipCode/${zipCodeId}`,
      config
    );

    if (response.data.success) {
      return {
        status: response.status,
        message: response.data.message,
      };
    }
    redirect("/admin/auth/signin", RedirectType.replace);
  } catch (error) {
    console.log("error::::", error);
    redirect("/admin/auth/signin", RedirectType.replace);
  }
};
