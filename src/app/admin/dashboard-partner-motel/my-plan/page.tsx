import { auth } from '@/auth.config';
import { MotelSubscriptionApi, Plan, SubscriptionTier } from '@/interfaces';
import { currencyFormat, formatDate } from '@/utils';
import axios from 'axios';
import { redirect } from 'next/navigation';
import React from 'react';
import { AiFillLike, AiOutlineArrowRight } from 'react-icons/ai';
import { Pricing } from './ui/Pricing';

export default async function MyPlanPage() {
    const session = await auth();

    if (!session?.user.roles.includes("motelPartner")) {
        redirect("/motel-partner");
    }

    let subscriptionMotel: MotelSubscriptionApi;
    let allPlans: Plan[];

    try {
        const response = await axios.get<MotelSubscriptionApi>(`${process.env.NEXT_PUBLIC_API_ROUTE}motel/subscription`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            }
        );
        subscriptionMotel = response.data;
    } catch (error: any) {
        console.error("Error al obtener la suscripción del motel:", error);
        redirect("/");
    }

    try {
        const response = await axios.get<Plan[]>(`${process.env.NEXT_PUBLIC_API_ROUTE}subscription/detail/all`);
        allPlans = response.data;
    } catch (error: any) {
        console.error("Error al obtener todos los planes:", error);
        redirect("/");
    }

    const expirationTimestamp: number = new Date(subscriptionMotel.endDate).getTime();
    const currentTimestamp: number = new Date().getTime();
    const differenceInMilliseconds: number = expirationTimestamp - currentTimestamp;
    const daysRemaining: number = Math.ceil(Math.max(0, differenceInMilliseconds / (1000 * 60 * 60 * 24)));

    const tierOrder: SubscriptionTier[] = ['FREE', 'BASIC', 'PREMIUM', 'ENTERPRISE'];
    const currentTierIndex = tierOrder.indexOf(subscriptionMotel.tier);
    const nextTier = tierOrder[currentTierIndex + 1];

    const nextPlan = allPlans.find(
        (plan) => plan.tier === nextTier
    );

    const isLastTier = currentTierIndex === tierOrder.length - 1;

    const formatCommission = (commission: string | number) => {
        return Math.round(Number(commission));
    };


    return (
        <div className='bg-white rounded-xl mb-10 shadow-sm'>
            <div className="py-10 px-5 md:mx-20">
                {/* Sección de "Mi Plan Actual" */}
                <h1 className="text-lg md:text-xl font-bold mb-6">Mi Plan Actual</h1>

                <div className='grid grid-cols-1 md:grid-cols-5 gap-6' >
                    <div className="col-span-1 md:col-span-3 h-full relative border border-blue-500 rounded-xl p-3 md:p-6 mb-10 bg-blue-50 shadow-md">
                        {/* Tag de "Expira en X días" - SIEMPRE VISIBLE según tu última indicación */}
                        <div className="absolute top-0 right-0 -mt-3 mr-2 bg-red-600 text-white text-xs font-bold px-4 py-1 rounded shadow-md">
                            Expira en {daysRemaining} días
                        </div>
                        <div className='flex justify-start mt-2 mb-4' >
                            {/* Mensaje de renovación automática solo para el plan FREE */}
                            {subscriptionMotel.tier === "FREE" && (
                                <div className='bg-blue-600 flex gap-2 items-center rounded-full text-white py-1 px-4 text-xs md:text-sm' >
                                    <AiFillLike className='' />
                                    <p className='hidden md:block' > El plan se renueva automáticamente, no te preocupes.</p>
                                    <p className='block md:hidden' >Renovación automática</p>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between items-center mb-1">
                            <h2 className="text-lg md:text-2xl font-semibold text-blue-800">Plan {subscriptionMotel.tier}</h2>
                            <span className="text-md md:text-xl font-bold text-blue-700">
                                {subscriptionMotel.tier === "FREE" ? 'Gratis' : `$${currencyFormat(subscriptionMotel.price)} /Mes`}
                            </span>
                        </div>
                        <div className='text-xs md:text-sm font-light text-gray-700' >
                            {subscriptionMotel.description}
                        </div>
                        <h3 className="text-md md:text-lg mt-8 font-semibold text-gray-800 mb-3">Beneficios de tu plan:</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-sm">
                            {subscriptionMotel.benefits.map((benefit) => (
                                <li key={benefit.id} className="flex text-xs md:text-sm items-center text-gray-700">
                                    <svg className="w-4 h-4 flex-shrink-0 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    {benefit.name}
                                </li>
                            ))}
                        </ul>

                        <div className='grid grid-cols-1 space-y-4 md:space-y-0 md:grid-cols-2 ml-2 mt-8' >
                            <div>
                                <p className="text-md md:text-lg font-semibold text-gray-800 mb-1">
                                    Adquirido
                                </p>
                                <p className='text-xs md:text-sm font-light text-gray-700' >{formatDate(subscriptionMotel.startDate)}</p>
                            </div>

                            <div>
                                <p className="text-md md:text-lg font-semibold text-gray-800 mb-1">
                                    Expira
                                </p>
                                <p className='text-xs md:text-sm font-light text-gray-700' >{formatDate(subscriptionMotel.endDate)}</p>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: Mostrar el siguiente plan (col-span-2) */}
                    <div className='col-span-1 md:col-span-2'>
                        {isLastTier ? (
                            // Mensaje si ya está en el último plan
                            <div className="flex items-center justify-center h-full border border-gray-300 rounded-xl p-6 bg-gray-50 text-gray-600 text-center">
                                <p className="text-lg font-medium">¡Ya estás en nuestro plan más alto!</p>
                            </div>
                        ) : (
                            // Muestra el card del siguiente plan si existe y no es el último tier
                            nextPlan && (
                                <div className="relative border border-green-500 rounded-xl p-3 md:p-6 bg-green-50 shadow-lg h-full flex flex-col justify-between">
                                    {/* Etiqueta "Mejora tu plan!" */}
                                    <div className="absolute top-0 right-0 -mt-3 mr-2 bg-green-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md animate-bounce">
                                        ¡Mejora tu plan!
                                    </div>
                                    <div className="flex flex-col items-center mb-4">
                                        <h2 className="text-xl md:text-2xl font-semibold text-green-800 mb-1">
                                            Plan {nextPlan.tier}
                                        </h2>
                                        <span className="text-lg md:text-xl font-bold text-green-700">
                                            {currencyFormat(nextPlan.price)} /mes
                                        </span>
                                        <p className="text-sm font-bold text-gray-600">+ {formatCommission(nextPlan.commissionPercentage)}% comisión por reserva</p>
                                        <p className='text-xs md:text-sm font-light text-gray-600 text-center mt-2'>
                                            {nextPlan.description}
                                        </p>
                                    </div>

                                    <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-3">Beneficios adicionales:</h3>
                                    <ul className="grid grid-cols-1 gap-y-2 text-sm flex-grow">
                                        {/* Mostrar todos los beneficios del siguiente plan */}
                                        {nextPlan.benefits.map((benefit) => (
                                            <li key={benefit.id} className="flex text-xs md:text-sm items-center text-gray-700">
                                                <svg className="w-4 h-4 flex-shrink-0 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                {benefit.name}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-6 text-center">
                                        <button className="flex items-center justify-center w-full bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-colors duration-300 shadow-md">
                                            Actualizar ahora <AiOutlineArrowRight className="ml-2" />
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Sección de "Explora Otros Planes" */}
                <h1 className="text-lg md:text-xl font-bold mt-12">Explora todos los planes</h1>
                <Pricing
                    plans={allPlans}
                    tokenSession={session.accessToken}
                    currentMotelTier={subscriptionMotel.tier}
                />
            </div>
        </div>
    );
}