import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { GetUserByEmail } from '../../../actions/user/get-user-by-email';

export default async function SearchBookingLayout({
 children
}: {
 children: React.ReactNode;
}) {

  const session = await auth();

  if (session?.user.roles.includes("user")) {
    redirect("/");
}

  return (
    <>
    {children}
    </>
  );
}