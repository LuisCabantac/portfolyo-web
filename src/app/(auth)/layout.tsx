import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import Header from "@/components/header";

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { userId } = await auth();

  if (userId) {
    return redirect("/");
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default RootLayout;
