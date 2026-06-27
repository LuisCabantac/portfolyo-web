import Footer from "@/components/footer";
import Header from "@/components/header";

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
