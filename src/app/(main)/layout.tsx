import Footer from "@/components/footer";
import Header from "@/components/header";

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header showLinks showCTA />
      {children}
      <Footer />
    </>
  );
};

export default RootLayout;
