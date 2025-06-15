'use client';
import Image from 'next/image';
import { Lobster } from "@/config/fonts";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

export const HeaderAuth = () => {

    const pathname = usePathname();
    const router = useRouter();

    const redirectPage = () => {

        if (pathname === "/auth/login/email" || pathname === "/auth/new-account") {
            router.push("/auth/login")
        } else {
            const redirectUrl = localStorage.getItem('redirectUrl');
            if (redirectUrl) {
                localStorage.removeItem('redirectUrl');
                window.location.replace(redirectUrl);
            } else {
                window.location.replace("/");
            }
        }
    }

    return (
        <>
            <div className="border-b p-4 border-gray-200">
                <div className="flex justify-between items-center">
                    <button
                        onClick={redirectPage}
                        className='flex gap-2 items-center'>
                        <IoArrowBackOutline className="h-5 w-5" />
                        <span className='font-normal text-md'>Volver</span>
                    </button>
                    <Link href="/" className='flex gap-2 justify-center items-center'  >
                        <Image
                            src="/app/LogoApp.png"
                            width={35}
                            height={35}
                            alt="logoOficial.png"
                        />
                        <div>
                            <span className={`${Lobster.className} text-2xl antialiased font-bold`}>Vibe</span>
                            <span className={` ${Lobster.className} text-2xl text-red-500 `}>Tel</span>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}
