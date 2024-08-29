"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export const getPricings = async () => {
  const url = process.env.API_URL;
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      redirect("/auth/sigin", RedirectType.replace);
    }

    const response = await axios.get(`${url}/admin/getPricings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return {
        status: response.status,
        pricings: {
          small: response.data?.pricings?.small,
          medium: response.data?.pricings?.medium,
          large: response.data?.pricings?.large,
          largeBase: response.data?.pricings?.largeBase,
          superLarge: response.data?.pricings?.superLarge,
          superLargeBase: response.data?.pricings?.superLargeBase,
        },
      };
    }
    redirect("/auth/sign", RedirectType.replace);
  } catch (error) {
    redirect("/auth/sigin", RedirectType.replace);
  }
};

type PricingProps = {
  small?: number;
  medium?: number;
  large?: number;
  largeBase?: number;
  superLarge?: number;
  superLargeBase?: number;
};

export const updatePricings = async ({
  small,
  medium,
  large,
  largeBase,
  superLarge,
  superLargeBase,
}: PricingProps) => {
  const url = process.env.API_URL;

  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      redirect("/auth/sigin", RedirectType.replace);
    }

    const data: any = {};
    if (small) data.small = small;
    if (medium) data.medium = medium;
    if (large) data.large = large;
    if (largeBase) data.largeBase = largeBase;
    if (superLarge) data.superLarge = superLarge;
    if (superLargeBase) data.superLargeBase = superLargeBase;

    const response = await axios.patch(`${url}/admin/updatePricings`, data, {
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

    redirect("/auth/sigin", RedirectType.replace);
  } catch (error) {
    redirect("/auth/sigin", RedirectType.replace);
  }
};
