import type { Metadata } from "next";

import "./globals.css";

import { DomainProvider } from "../utils/context/DomainContext";

import { getDomain } from "@/utils/functions/domain";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Domain for Sale",
  description: "This domain is for sale",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const domain = await getDomain();

  if (!domain) {
    return <div>Domain not found</div>;
  }

  return (
    <html lang="en">
      <body className="min-h-screen w-screen overflow-x-hidden">
        <DomainProvider domain={domain}>
          <div className="flex flex-col p-5">
            {children}
            <Footer />
          </div>
        </DomainProvider>
      </body>
    </html>
  );
}
