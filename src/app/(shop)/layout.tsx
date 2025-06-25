import { Footer, SideBar, ToastSuccessLocationUser, TopMenu } from "@/components";

export default function ShopLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <main className="" >
      <ToastSuccessLocationUser />
      <TopMenu />
      <SideBar />

      <div className="" >
        {children}
      </div>

      <Footer />

    </main>

  );
}