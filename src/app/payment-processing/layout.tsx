import { TopMenuPaymentProcessing } from "@/components";
import { fontPoppins } from "@/config/fonts";

export default function PayMentProcessingLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <main className={` ${fontPoppins.className} min-h-screen`} >
            <TopMenuPaymentProcessing />
            {children}
        </main>
    );
}