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

    const { drivers, total } = response.data;

    const data = drivers.map((driver: any) => ({
      id: driver._id,
      imageUrl: driver.driverImage,
      name: driver.name,
      contactInfo: { email: driver.email, phone: driver.phone },
      dob: driver.dob,
      address: {
        state: driver.address.state,
        zipCode: driver.address.zipCode,
        addressZipCode: driver.address.addressZipCode,
        addressType: driver.address.addressType,
      },
      status: driver.status,
      amountEarned: driver.amountEarned,
      isDocumentsVerified: driver.isDocumentsVerified,
    }));

    if (response.data.success) {
      return {
        status: response.status,
        data,
        total,
      };
    }
    redirect("/auth/sign", RedirectType.replace);
  } catch (error) {
    redirect("/auth/sign", RedirectType.replace);
  }
};

export const getDriverVehicleDocuments = async (driverId: string) => {
  const url = process.env.API_URL;
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      redirect("/auth/sigin", RedirectType.replace);
    }
    const response = await axios.get(
      `${url}/admin/getDriverVehichleDetails/${driverId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      return {
        status: response.status,
        data: { driver: response.data.driver },
      };
    }
    redirect("/auth/sign", RedirectType.replace);
  } catch (error) {
    redirect("/admin/auth/signin", RedirectType.replace);
  }
};

export const approveDriverVehicleDocuments = async (driverId: string) => {
  const url = process.env.API_URL;
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      redirect("/auth/sigin", RedirectType.replace);
    }
    const response = await axios.patch(
      `${url}/admin/approveDriverDocuments/${driverId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      return {
        status: response.status,
        message: response.data.message,
      };
    }
    redirect("/auth/sign", RedirectType.replace);
  } catch (error) {
    redirect("/admin/auth/signin", RedirectType.replace);
  }
};