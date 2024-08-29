"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export const login = async (email: string, password: string) => {
  const url = process.env.API_URL;
  try {
    const response = await axios.post(
      `${url}/admin/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.success) {
      const { message, token } = response.data;
      cookies().set("token", token);
      return { status: response.status, message };
    }

    return { status: 400, message: "Invalid email or password", data: null };
  } catch (error: any) {
    const { status, message } = error.response.data;
    return { status, message, data: null };
  }
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const url = process.env.API_URL!;

  try {
    const token = cookies().get("token")?.value;
    if (!token) redirect("/auth/signin", RedirectType.replace);

    const response = await axios.put(
      `${url}/admin/changePassword`,
      { oldPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      status: response.status,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
};
