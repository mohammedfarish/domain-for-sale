"use client";

import React from "react";

import { useDomain } from "@/utils/context/DomainContext";

const Footer = () => {
  const domain = useDomain();

  return (
    <div className="bottom-0 fixed w-screen bg-gray-100 -mx-5 p-2 select-none text-center text-xs border-t">
      Designed and developed by{" "}
      <a
        href={"https://fari.sh/?utm_source=" + domain}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Mohammed Farish
      </a>
      .
    </div>
  );
};

export default Footer;
