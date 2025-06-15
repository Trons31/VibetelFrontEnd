import { ChatSupport, Footer, SideBar, ToastSuccessLocationUser, TopMenu } from "@/components";

export default function MotelLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <main className="" >
            <div className="" >
                {children}
            </div>
            <Footer />
        </main>

    );
}