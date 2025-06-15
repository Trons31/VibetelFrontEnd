'use client';
import Link from 'next/link'
import Image from 'next/image';
import { Lobster } from '@/config/fonts';
import { useRouter } from 'next/navigation';
import { IoArrowBackOutline } from 'react-icons/io5';

export const TopMenuMotel = () => {

    const router = useRouter();


    return (
        <nav className="flex fixed px-3 md:px-12 z-20 top-0 py-3 items-center bg-white w-full border-b border-gray-100 shadow-sm"
        >
            <div className='flex justify-between items-center w-full' >
                <button
                    onClick={() => router.back()}
                    className='flex gap-1 items-center' >
                    <IoArrowBackOutline className="h-5 w-5" />
                    <span>
                        Volver
                    </span>
                </button>

                <Link href="/" target="_blank" className="flex space-x-1 items-center" rel="noopener noreferrer" >
                    <Image
                        src="/app/LogoApp.png"
                        width={35}
                        height={35}
                        alt="logoOficial.png"
                    />
                    <div>
                        <span className={`${Lobster.className} text-2xl antialiased font-bold`}>Vibe</span>
                        <span className={` ${Lobster.className} text-2xl text-red-600 `}>Tel</span>
                    </div>
                </Link>
            </div>
        </nav >
    )
}
