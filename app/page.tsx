import React from "react";

import Homepage from "@/components/homepage/Homepage";
import { getDomain } from "@/utils/functions/domain";
import { Metadata } from "next";

export async function generateMetadata() {
  const domain = await getDomain();
  return {
    description: domain + " is for sale.",
  } satisfies Metadata;
}

const page = () => {
  return <Homepage />;
};

export default page;
