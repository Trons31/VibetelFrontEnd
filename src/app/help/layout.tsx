import { Footer, TopMenuHelp } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
      <TopMenuHelp />
      <div className="">{children}</div>

      <Footer />
    </main>
  );
}
