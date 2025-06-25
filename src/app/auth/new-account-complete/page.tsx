import { auth } from "@/auth.config";
import { CompleteForm } from "./ui/CompleteForm";

export default async function CompleteRegisterPage() {
    const session = await auth();
    return (
        <div>
            
            <CompleteForm name={session?.user.name!} email={session?.user.email!} />

        </div>
    );
}