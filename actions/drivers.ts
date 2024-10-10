"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { toast } from "react-toastify";

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

export const getDriverVehicleDocuments = async (endpoint: string) => {
  const url = process.env.API_URL;
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      redirect("/auth/sigin", RedirectType.replace);
    }
    const response = await axios.get(`${url}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

export const approveDriverVehicleDocuments = async (
  endpoint: string,
  body: any
) => {
  const url = process.env.API_URL;
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      redirect("/auth/sigin", RedirectType.replace);
    }
    const response = await axios.patch(`${url}/${endpoint}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

export const getDriversForDocumentsVerification = async (
  page: number,
  limit: number
) => {
  const url = process.env.API_URL!;
  try {
    const token = cookies().get("token")?.value;
    if (!token) redirect("/auth/signin", RedirectType.replace);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      `${url}/admin/getDriversForDocumentsVerification?page=${page}&limit=${limit}`,
      config
    );

    if (response.data.success) {
      const { drivers, total } = response.data;
      return {
        status: response.status,
        data: drivers.map((driver: any) => ({
          id: driver._id,
          imageUrl: driver.driverImage,
          name: driver.name,
          contactInfo: { email: driver?.email, phone: driver?.phone },
          dob: driver.dob,
          address: {
            state: driver?.address?.state,
            zipCode: driver?.address?.zipCode,
            addressZipCode: driver?.address?.addressZipCode,
            addressType: driver?.address?.addressType,
          },
        })),
        total,
      };
    }
    redirect("/auth/signin", RedirectType.replace);
  } catch (error: any) {
    if (error.response.data.status == 401)
      redirect("/auth/signin", RedirectType.replace);

    toast.error(error.response.data.message);
  }
};

// export const getDocumentsById = async (driverId: string) => {
//   const url = process.env.API_URL!;
//   try {
//     const token = cookies().get("token")?.value;
//     if (token) redirect("/auth/signin", RedirectType.replace);

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const response = await axios.get(
//       `${url}/admin/getDocumentsById/${driverId}`,
//       config
//     );

//     if (response.data.success) {
//       return { status: response.status, data: {} };
//     }

//     redirect("/auth/signin", RedirectType.replace);
//   } catch (error: any) {
//     if (error.response.data.status == 401)
//       redirect("/auth/signin", RedirectType.replace);

//     toast.error(error.response.data.message);
//   }
// };
