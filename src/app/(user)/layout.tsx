import { Metadata } from "next";

import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Browse and discover developer portfolios on Portfolyo. Explore projects, filter by expertise, and find inspiration from the developer community.",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default RootLayout;
