"use server";
import axios from "axios";
import { cookies } from "next/headers";

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
      cookies().set("token",token);
      return { status: response.status, message, data: { token } };
    }

    return { status: 400, message: "Invalid email or password", data: null };
  } catch (error: any) {
    const { status, message } = error.response.data;
    return { status, message, data: null };
  }
};
