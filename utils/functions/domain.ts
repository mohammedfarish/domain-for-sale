import { headers } from "next/headers";

import isdev from "./isdev";
import { objectToUrlParams } from "./misc";
import axios from "axios";
import ntfy from "./ntfy";

export const getDomain = async () => {
  const headersList = await headers();
  const host = headersList.get("host");
  if (!host) throw new Error("Host not found");
  if (isdev) return "somedomain.com";
  return host;
};

export const getIP = async () => {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for");
  return ip;
};

export const sendEnquiry = async ({ name, email, message, price }: { name: string; email: string; message: string; price: number }) => {
  const domain = await getDomain();
  const ip = await getIP();

  const params = objectToUrlParams({
    "entry.485974883": name,
    "entry.2097651143": price,
    "entry.201194576": domain,
    "entry.1102316893": email,
    "entry.1737886175": message,
    "entry.640576711": ip,
  });

  const formID = process.env.GOOGLE_FORM_ID;
  const url = `https://docs.google.com/forms/d/e/${formID}/formResponse`;
  const newURL = [url, params].join("?");
  await axios.post(newURL);

  await ntfy({
    topic: {
      ntfyURL: process.env.NTFY_URL || "",
      topic: process.env.NTFY_TOPIC || "",
    },
    title: "Domain For Sale Enquiry",
    body: `Domain: ${domain}\nName: ${name}\nEmail: ${email}\nPrice: ${price}\nMessage: ${message}`,
    priority: 5,
  });

  return true;
};
