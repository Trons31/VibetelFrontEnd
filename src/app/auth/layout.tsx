import { auth } from "@/auth.config";
import { fontPoppins} from "@/config/fonts";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: {
    children: React.ReactNode;
   }) {

    // const session = await auth();

    // if(session?.user.role === "motelPartner"){
    //    redirect("/admin/dashboard-partner-motel")
    // }

     return (
       <main className={` ${fontPoppins.className} min-h-screen`} >
         {children}
       </main>
     );
   }