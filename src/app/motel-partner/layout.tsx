import { FooterMotelPartners, SideMenuMotelPartners, TopMenuPartners } from "@/components";

export default function SocioMotelLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen " >

      <TopMenuPartners />
      <SideMenuMotelPartners />
      <div className="" >
        {children}
      </div>

      <FooterMotelPartners />
    </main>

  );
}