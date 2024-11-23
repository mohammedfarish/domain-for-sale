"use client";

import React from "react";
import Marquee from "react-fast-marquee";

import Typography from "../common/Typography";

import { useDomain } from "@/utils/context/DomainContext";
import { chanceObj } from "@/utils/functions/chance";
import EnquiryForm from "./EnquiryForm";

const Homepage = () => {
  const domain = useDomain();

  const count = 6;

  return (
    <div className="flex flex-col gap-5 items-center select-none">
      <div className="w-full flex justify-center p-5 shadow-lg bg-black text-white rounded-lg">
        <Typography type="heading" value="Domain for Sale" />
      </div>

      <Marquee
        speed={150}
        direction="left"
        className="bg-green-400 py-2 overflow-y-hidden"
      >
        <div className="font-black text-8xl xs:text-2xl tracking-tighter uppercase">
          {Array.from({ length: count }).map(() => (
            <span className="mx-10" key={chanceObj.guid()}>
              {domain}
            </span>
          ))}
        </div>
      </Marquee>
      <Marquee
        speed={150}
        direction="right"
        className="bg-yellow-400 py-2 overflow-y-hidden"
      >
        <div className="font-black text-8xl xs:text-2xl tracking-tighter uppercase">
          {Array.from({ length: count }).map(() => (
            <span className="mx-10" key={chanceObj.guid()}>
              {domain}
            </span>
          ))}
        </div>
      </Marquee>

      <EnquiryForm />
    </div>
  );
};

export default Homepage;
