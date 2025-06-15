'use client';
import { currencyFormat, sleep } from '@/utils';
import clsx from 'clsx';
import React, { useState } from 'react'
import { FaCalendarAlt, FaCalendarCheck } from 'react-icons/fa';
import { TiArrowDownThick } from 'react-icons/ti';
import { Benefit, Plan } from '@/interfaces';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { BenefitItem } from '@/components';


const ALL_BENEFITS = [
    {
        id: '1',
        name: 'Soporte técnico 24/7',
        description: 'Atención técnica disponible las 24 horas, todos los días.'
    },
    {
        id: '2',
        name: 'Registro y respaldo automático de información',
        description: 'Tus datos siempre seguros con copias automáticas.'
    },
    {
        id: '3',
        name: 'Visibilidad en la plataforma',
        description: 'Tu motel será visible para miles de usuarios.'
    },
    {
        id: '4',
        name: 'Notificaciones en tiempo real',
        description: 'Recibe alertas al instante sobre nuevas reservas y eventos importantes.'
    },
    {
        id: '5',
        name: 'Dashboard de administración',
        description: 'Control total del motel desde una interfaz amigable.'
    },
    {
        id: '6',
        name: 'Estadísticas de ocupación y rendimiento',
        description: 'Analiza el comportamiento de tus habitaciones y mejora tu estrategia.'
    },
    {
        id: '7',
        name: 'Notificaciones automáticas para clientes',
        description: 'Mantén a tus clientes informados con mensajes automáticos.'
    },
    {
        id: '8',
        name: 'Prioridad en los resultados de búsqueda',
        description: 'Aumenta la visibilidad de tu motel en la plataforma.'
    },
    {
        id: '9',
        name: 'Acceso a métricas de desempeño',
        description: 'Monitorea el desempeño de tu negocio con métricas detalladas.'
    },
    {
        id: '10',
        name: 'Reportes avanzados y detallados',
        description: 'Toma decisiones con base en información profunda y precisa.'
    },
    {
        id: '11',
        name: 'Análisis inteligente del motel',
        description: 'Obtén insights con IA sobre el comportamiento del negocio.'
    },
    {
        id: '12',
        name: 'Optimización de tarifas con IA',
        description: 'Ajusta tus precios automáticamente para maximizar ganancias.'
    },
    {
        id: '13',
        name: 'Asesoría personalizada',
        description: 'Recibe apoyo experto para impulsar tu motel.'
    },
    {
        id: '14',
        name: 'Automatización de mantenimiento',
        description: 'Gestiona el mantenimiento del motel de forma automática.'
    }
];

interface Props {
    plans: Plan[];
    tokenSession: string;
}

export const Pricing = ({ plans, tokenSession }: Props) => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);


    const hasBenefit = (planBenefits: Benefit[], benefitId: string) => {
        return planBenefits.some(b => b.id === benefitId);
    };

    const getPrice = (price: number) => {
        if (billingCycle === 'monthly') {
            return Number(price);
        } else {
            return Number(price) * 10;
        }
    };

    const formatCommission = (commission: string | number) => {
        return Math.round(Number(commission));
    };

    const calculateEndDate = (startDate: Date, isYearly: boolean) => {
        const endDate = new Date(startDate);
        if (isYearly) {
            endDate.setMonth(endDate.getMonth() + 10);
        } else {
            endDate.setMonth(endDate.getMonth() + 1);
        }
        return endDate;
    };

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const handlePlanSelect = async (planId: string, planName: string) => {
        setLoadingPlanId(planId);
        const startDate = new Date();
        const endDate = calculateEndDate(startDate, billingCycle === 'yearly');

        const data = {
            subscriptionDetailId: planId,
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
            isActive: true
        };
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_ROUTE}subscription`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${tokenSession}`,
                    },
                }
            );
            toast.success(`Te has afilidao al ${planName}`,
                {
                    duration: 4000
                }
            )
            await sleep(4);
            setLoadingPlanId(null);
            window.location.replace('/admin/dashboard-partner-motel');

        } catch (error) {
            toast.error(`Error al afiliarze al ${planName}`,
                {
                    duration: 4000
                }
            )
            setLoadingPlanId(null);
        }
    };

    const freePlan = plans.find(plan => plan.tier === "FREE")
    const basicPlan = plans.find(plan => plan.tier === 'BASIC');
    const premiumPlan = plans.find(plan => plan.tier === 'PREMIUM');
    const enterprisePlan = plans.find(plan => plan.tier === 'ENTERPRISE');

    const renderBenefits = (planBenefits: Benefit[]) => {
        return (
            <ul className="space-y-4 mt-4 mb-4">
                {ALL_BENEFITS.map((benefit) => {
                    const hasBenefitFlag = hasBenefit(planBenefits, benefit.id);
                    return (
                        <li key={benefit.id} className="flex items-start">
                            {hasBenefitFlag ? (
                                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            )}
                            <BenefitItem
                                text={benefit.name}
                                tooltipText={benefit.description}
                            />
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <div className="relative isolate bg-white px-4 md:px-6 py-24 mt-5 md:mt-20 sm:py-8 lg:px-8">
                <div className="px-2">
                    <p className="text-xl md:text-3xl font-semibold">¡Estás a un paso de finalizar!</p>
                    <p className="text-sm mt-1 md:mt-0 text-gray-600">Completa este último paso para terminar el registro de tu motel. <strong className='text-red-600' >Afíliese al plan</strong>  que mejor se adapte a su motel y aproveche herramientas diseñadas para optimizar sus reservas, atraer más clientes y aumentar su rentabilidad.</p>
                </div>

                <div className="flex justify-center mt-10">
                    <div className="inline-flex rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-4 md:px-6 py-3 text-xs md:text-sm font-medium flex items-center ${billingCycle === 'monthly'
                                ? 'bg-red-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <FaCalendarAlt className="mr-2" />
                            Mensualidad
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-4 md:px-6 py-3 text-xs md:text-sm font-medium flex items-center ${billingCycle === 'yearly'
                                ? 'bg-red-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <FaCalendarCheck className="mr-2" />
                            Anualidad
                            <span className={
                                clsx(
                                    {
                                        "ml-2 text-xs md:text-xs bg-white text-black px-2 py-0.5 rounded-full": billingCycle === 'yearly',
                                        "ml-2 text-xs md:text-xs bg-black text-white px-2 py-0.5 rounded-full": billingCycle !== 'yearly'
                                    }
                                )
                            } >
                                <TiArrowDownThick />
                            </span>
                        </button>
                    </div>
                </div>
                <div className="mt-10 md:mt-10 grid w-full grid-cols-1 items-stretch gap-7 sm:mt-10 sm:gap-y-0 lg:grid-cols-4">

                    {freePlan && (
                        <div className="relative z-0 py-8 px-6 rounded-3xl shadow-lg ring-1 ring-red-600 hover:ring-red-700 transition-all duration-300">
                            <h3 className="text-xl font-bold text-red-700 mb-4">Plan Free</h3>
                            <div className="mb-3 py-4 px-1">
                                <div className="flex">
                                    <p className="text-2xl font-extrabold text-red-600">{currencyFormat(getPrice(freePlan.price))}</p>
                                    <p className="text-sm text-red-600  mt-1">{billingCycle === 'monthly' ? '/Mes' : '/Año'}</p>
                                </div>
                                <p className="text-sm text-red-600">+ {formatCommission(freePlan.commissionPercentage)}% comisión por reserva</p>
                            </div>

                            <p className="text-gray-600 mb-3 text-xs leading-relaxed" style={{ textAlign: 'justify' }}>
                                {freePlan.description}
                            </p>

                            <button
                                onClick={() => handlePlanSelect(freePlan.id, "plan free")}
                                disabled={loadingPlanId !== null}
                                className={
                                    clsx(
                                        {
                                            "flex justify-center items-center gap-2 w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300 transform shadow-md cursor-not-allowed": loadingPlanId !== null,
                                            "flex justify-center items-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300 transform hover:scale-[1.02] shadow-md": loadingPlanId === null
                                        }
                                    )
                                }
                            >
                                {
                                    loadingPlanId === freePlan.id && (
                                        <div className="flex justify-center items-center">
                                            <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </div>
                                    )
                                }

                                {
                                    loadingPlanId === freePlan.id
                                        ? (
                                            <span>Cargando...</span>
                                        ) : (
                                            <span>Comenzar ahora</span>
                                        )
                                }
                            </button>

                            <div className="mt-4 mb-2 border border-gray-400 border-dashed" />
                            {renderBenefits(freePlan.benefits)}
                        </div>
                    )}

                    {basicPlan && (
                        <div className="relative z-0 py-8 px-6 rounded-3xl shadow-lg ring-1 ring-red-600 hover:ring-red-700 transition-all duration-300">
                            <h3 className="text-xl font-bold text-red-700 mb-4">Plan Start</h3>
                            <div className="mb-3 py-4 px-1">
                                <div className="flex">
                                    <p className="text-2xl font-extrabold text-red-600">{currencyFormat(getPrice(basicPlan.price))}</p>
                                    <p className="text-sm text-red-600  mt-1">{billingCycle === 'monthly' ? '/Mes' : '/Año'}</p>
                                </div>
                                <p className="text-sm text-red-600">+ {formatCommission(basicPlan.commissionPercentage)}% comisión por reserva</p>
                            </div>

                            <p className="text-gray-600 mb-3 text-xs leading-relaxed" style={{ textAlign: 'justify' }}>
                                {basicPlan.description}
                            </p>

                            <button
                                onClick={() => handlePlanSelect(basicPlan.id, "plan start")}
                                disabled={loadingPlanId !== null}
                                className={
                                    clsx(
                                        {
                                            "flex justify-center items-center gap-2 w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300 transform shadow-md cursor-not-allowed": loadingPlanId !== null,
                                            "flex justify-center items-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300 transform hover:scale-[1.02] shadow-md": loadingPlanId === null
                                        }
                                    )
                                }
                            >
                                {
                                    loadingPlanId === basicPlan.id && (
                                        <div className="flex justify-center items-center">
                                            <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </div>
                                    )
                                }

                                {
                                    loadingPlanId === basicPlan.id
                                        ? (
                                            <span>Cargando...</span>
                                        ) : (
                                            <span>Comenzar ahora</span>
                                        )
                                }
                            </button>

                            <div className="mt-4 mb-2 border border-gray-400 border-dashed" />
                            {renderBenefits(basicPlan.benefits)}
                        </div>
                    )}

                    {premiumPlan && (
                        <div className="relative py-8 px-6 rounded-3xl shadow-lg ring-1 ring-red-600 hover:ring-red-700 transition-all duration-300">
                            <h3 className="text-xl font-bold text-red-700 mb-4">Plan Plus</h3>
                            <div className="absolute top-0 right-0 -mt-3 mr-6 bg-red-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-md">
                                Más popular
                            </div>
                            <div className="mb-3 py-4 px-1">
                                <div className="flex">
                                    <p className="text-2xl font-extrabold text-red-600">{currencyFormat(getPrice(premiumPlan.price))}</p>
                                    <p className="text-sm text-red-600 mt-1">{billingCycle === 'monthly' ? '/Mes' : '/Año'}</p>
                                </div>
                                <p className="text-sm text-red-600">+ {formatCommission(premiumPlan.commissionPercentage)}% comisión por reserva</p>
                            </div>
                            <p className="text-gray-600 mb-3 text-xs leading-relaxed" style={{ textAlign: 'justify' }}>
                                {premiumPlan.description}
                            </p>
                            <button
                                disabled={loadingPlanId !== null}
                                onClick={() => handlePlanSelect(premiumPlan.id, "plan plus")}
                                className={
                                    clsx(
                                        {
                                            "flex justify-center items-center gap-2 w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300 transform shadow-md cursor-not-allowed": loadingPlanId !== null,
                                            "flex justify-center items-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300 transform hover:scale-[1.02] shadow-md": loadingPlanId === null
                                        }
                                    )
                                }
                            >
                                {
                                    loadingPlanId === premiumPlan.id && (
                                        <div className="flex justify-center items-center">
                                            <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </div>
                                    )
                                }

                                {
                                    loadingPlanId === premiumPlan.id
                                        ? (
                                            <span>Cargando...</span>
                                        ) : (
                                            <span>Comenzar ahora</span>
                                        )
                                }
                            </button>

                            <div className="mt-4 mb-2 border border-gray-400 border-dashed" />
                            {renderBenefits(premiumPlan.benefits)}
                        </div>
                    )}

                    {enterprisePlan && (
                        <div className="relative py-8 px-6 rounded-3xl shadow-lg ring-1 ring-red-600 hover:ring-red-700 transition-all duration-300">
                            <h3 className="text-xl font-bold text-red-700 mb-4">Plan Élite</h3>
                            <div className="mb-3 py-4 px-1">
                                <div className="flex">
                                    <p className="text-2xl font-extrabold text-red-600">{currencyFormat(getPrice(enterprisePlan.price))}</p>
                                    <p className="text-sm mt-1 text-red-600">{billingCycle === 'monthly' ? '/Mes' : '/Año'}</p>
                                </div>
                                <p className="text-sm text-red-600">+ {formatCommission(enterprisePlan.commissionPercentage)}% comisión por reserva</p>
                            </div>
                            <p className="text-gray-600 mb-3 text-xs leading-relaxed" style={{ textAlign: 'justify' }}>
                                {enterprisePlan.description}
                            </p>
                            <button
                                onClick={() => handlePlanSelect(enterprisePlan.id, "plan elite")}
                                disabled={loadingPlanId !== null}
                                className={
                                    clsx(
                                        {
                                            "flex justify-center items-center gap-2 w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300 transform shadow-md cursor-not-allowed": loadingPlanId !== null,
                                            "flex justify-center items-center gap-2 w-full bg-red-600 text-white hover:bg-red-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-300 transform hover:scale-[1.02] shadow-md": loadingPlanId === null
                                        }
                                    )
                                }
                            >
                                {
                                    loadingPlanId === enterprisePlan.id && (
                                        <div className="flex justify-center items-center">
                                            <svg className="h-5 w-5 text-red-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </div>
                                    )
                                }

                                {
                                    loadingPlanId === enterprisePlan.id
                                        ? (
                                            <span>Cargando...</span>
                                        ) : (
                                            <span>Comenzar ahora</span>
                                        )
                                }
                            </button>
                            <div className="mt-4 mb-2 border border-gray-400 border-dashed" />

                            {renderBenefits(enterprisePlan.benefits)}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

