import { headers } from "next/headers";

import isdev from "./isdev";

export const getDomain = async () => {
  const headersList = await headers();
  const host = headersList.get("host");

  if (!host) throw new Error("Host not found");

  if (isdev) return "somedomain.com";

  return host;
};

export const sendEnquiry = async ({
  name,
  email,
  message,
  price,
}: {
  name: string;
  email: string;
  message: string;
  price: number;
}) => {
  const domain = await getDomain();

  console.log({
    name,
    email,
    message,
    price,

    domain,
  });

  return true;
};
