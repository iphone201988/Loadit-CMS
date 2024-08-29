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

    const { customers, total } = response.data;

    const data = customers.map((customer: any) => ({
      id: customer._id,
      name: customer.name,
      contactInfo: { email: customer.email, phone: customer.phone },
      dob: customer.dob,
      address: {
        state: customer.address.state,
        zipCode: customer.address.zipCode,
        addressZipCode: customer.address.addressZipCode,
        addressType: customer.address.addressType,
      },
      status: customer.status,
      amountSpent: customer.amountSpent,
    }));

    if (response.data.success) {
      return {
        status: response.status,
        data,
        total,
      };
    }
    redirect("auth/signin", RedirectType.replace);
  } catch (error: any) {
    redirect("auth/signin", RedirectType.replace);
  }
};

export const changeUserAccountStatus = async (
  userId: string,
  status: number
) => {
  const url = process.env.API_URL!;
  try {
    const token = cookies().get("token")?.value;
    if (!token) redirect("auth/signin", RedirectType.replace);
    console.log("token::",token)
    
    const response = await axios.put(
      `${url}/admin/changeUserStatus`,
      { userId, status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      return { status: response.status, message: response.data.message };
    }
    redirect("auth/signin", RedirectType.replace);
  } catch (error) {
    redirect("auth/signin", RedirectType.replace);
  }
};
