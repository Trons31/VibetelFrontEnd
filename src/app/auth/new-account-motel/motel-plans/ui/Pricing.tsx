'use client';
import { currencyFormat, sleep } from '@/utils';
import clsx from 'clsx';
import React, { useState } from 'react';
import { FaCalendarAlt, FaCalendarCheck } from 'react-icons/fa';
import { TiArrowDownThick } from 'react-icons/ti';
import { Benefit, Plan, SubscriptionPeriod } from '@/interfaces'; // Asume que 'Plan' tiene 'basePrice'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { BenefitItem, SelectOption } from '@/components';

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
    // Definimos los períodos de facturación. Los valores representan el factor de multiplicación del precio mensual.
    const billingOptions = [
        { label: 'Mensual', value: 1, periodType: 'MONTHLY' as SubscriptionPeriod },
        { label: 'Semestral', value: 5, periodType: 'SEMESTRAL' as SubscriptionPeriod }, // Ejemplo: 5 meses de pago por 6 meses de servicio
        { label: 'Anual', value: 10, periodType: 'ANNUAL' as SubscriptionPeriod },   // Ejemplo: 10 meses de pago por 12 meses de servicio
    ];

    const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
    // Estado para el período de facturación seleccionado, inicializado con la primera opción (Mensual)
    const [selectedBillingOption, setSelectedBillingOption] = useState(billingOptions[0]);

    const hasBenefit = (planBenefits: Benefit[], benefitId: string) => {
        return planBenefits.some(b => b.id === benefitId);
    };

    // La función getPrice ahora usa el basePrice del plan y el valor del período de facturación
    const getPrice = (basePrice: number) => {
        return Number(basePrice) * selectedBillingOption.value;
    };

    const formatCommission = (commission: string | number) => {
        return Math.round(Number(commission));
    };

    const calculateEndDate = (startDate: Date, periodType: SubscriptionPeriod) => {
        const endDate = new Date(startDate);
        switch (periodType) {
            case 'MONTHLY':
                endDate.setMonth(endDate.getMonth() + 1);
                break;
            case 'SEMESTRAL':
                endDate.setMonth(endDate.getMonth() + 6);
                break;
            case 'ANNUAL':
                endDate.setMonth(endDate.getMonth() + 12);
                break;
            default:
                endDate.setMonth(endDate.getMonth() + 1); // Por defecto, mensual
        }
        return endDate;
    };

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const handlePlanSelect = async (plan: Plan) => {
        setLoadingPlanId(plan.id);
        const startDate = new Date();
        const endDate = calculateEndDate(startDate, selectedBillingOption.periodType);

        const data = {
            subscriptionDetailId: plan.id,
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
            isActive: true,
            period: selectedBillingOption.periodType,
            actualPrice: getPrice(plan.price)
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
            toast.success(`Te has afiliado al plan ${plan.tier} (${selectedBillingOption.label})`,
                {
                    duration: 4000
                }
            );
            await sleep(4);
            setLoadingPlanId(null);
            window.location.replace('/admin/dashboard-partner-motel');

        } catch (error) {
            console.error(error);
            toast.error(`Error al afiliarte al plan ${plan.tier}`,
                {
                    duration: 4000
                }
            );
            setLoadingPlanId(null);
        }
    };

    const freePlan = plans.find(plan => plan.tier === "FREE");
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

            <div className="relative isolate bg-white px-4 md:px-6 py-24 mt-5 md:mt-20 sm:py-8 lg:px-14">
                <div className="px-2">
                    <p className="text-xl md:text-3xl font-semibold">¡Estás a un paso de finalizar!</p>
                    <p className="text-sm mt-1 md:mt-0 text-gray-600">Completa este último paso para terminar el registro de tu motel. <strong className='text-red-600' >Afíliese al plan</strong>  que mejor se adapte a su motel y aproveche herramientas diseñadas para optimizar sus reservas, atraer más clientes y aumentar su rentabilidad.</p>
                </div>

                <div className="flex justify-center mt-5">
                    <div>
                        <p className='text-md text-center text-gray-600' >Duración de la suscripción</p>
                        <SelectOption
                            options={billingOptions.map(opt => ({ label: opt.label, value: opt.value }))}
                            defaultOption={{ label: selectedBillingOption.label, value: selectedBillingOption.value }}
                            onOptionSelect={(option) => {
                                const fullOption = billingOptions.find(opt => opt.value === option.value);
                                if (fullOption) {
                                    setSelectedBillingOption(fullOption);
                                }
                            }}
                            className="w-[230px]"
                            classNameSelect="ring-red-600 border-2 hover:border-red-600 text-gray-700"
                        />
                    </div>
                </div>

                <div className="mt-10 md:mt-10 grid w-full grid-cols-1 items-stretch gap-7 sm:mt-10 sm:gap-y-0 lg:grid-cols-4">

                    {freePlan && (
                        <div className="relative flex flex-col bg-gray-50 py-8 px-6 rounded-3xl shadow-lg ring-2 ring-red-200 hover:ring-red-600 transition-all duration-300 h-full">
                            <h3 className="text-xl font-semibold text-black mb-4">Plan Free</h3>
                            <div className="mb-3 py-4 px-1">
                                <div className="flex">
                                    <p className="text-4xl font-bold text-black">{currencyFormat(getPrice(freePlan.price))}</p>
                                    <p className="text-sm md:text-md text-black mt-2">{`/${selectedBillingOption.label.toLowerCase()}`}</p>
                                </div>
                                <p className="text-sm text-black">+ {formatCommission(freePlan.commissionPercentage)}% comisión por reserva</p>
                            </div>

                            <p className="text-gray-600 mb-3 text-xs leading-relaxed" style={{ textAlign: 'justify' }}>
                                {freePlan.description}
                            </p>

                            <button
                                onClick={() => handlePlanSelect(freePlan)}
                                disabled={loadingPlanId !== null}
                                className={
                                    clsx(
                                        {
                                            "flex gap-2 justify-center w-full border-2 border-red-600 text-red-600 font-semibold py-3 px-6 rounded-xl transition-colors duration-300 transform hover:scale-[1.02] hover:bg-red-600 hover:text-white shadow-md cursor-not-allowed": loadingPlanId !== null,
                                            "flex justify-center w-full border-2 border-red-600 text-red-600 font-semibold py-3 px-6 rounded-xl transition-colors duration-300 transform hover:scale-[1.02] hover:bg-red-600 hover:text-white shadow-md": loadingPlanId === null
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
                        <div className="relative flex flex-col bg-gray-50 py-8 px-6 rounded-3xl shadow-lg ring-2 ring-red-200 hover:ring-red-600 transition-all duration-300 h-full">
                            <h3 className="text-xl font-semibold text-black mb-4">Plan Start</h3>
                            <div className="mb-3 py-4 px-1">
                                <div className="flex">
                                    <p className="text-4xl font-bold text-black">{currencyFormat(getPrice(basicPlan.price))}</p>
                                    <p className="text-sm md:text-md text-black mt-2">{`/${selectedBillingOption.label.toLowerCase()}`}</p>
                                </div>
                                <p className="text-sm text-black">+ {formatCommission(basicPlan.commissionPercentage)}% comisión por reserva</p>
                            </div>

                            <p className="text-gray-600 mb-3 text-xs leading-relaxed" style={{ textAlign: 'justify' }}>
                                {basicPlan.description}
                            </p>

                            <button
                                onClick={() => handlePlanSelect(basicPlan)}
                                disabled={loadingPlanId !== null}
                                className={
                                    clsx(
                                        {
                                            "flex gap-2 justify-center w-full border-2 border-red-600 text-red-600 font-semibold py-3 px-6 rounded-xl transition-colors duration-300 transform hover:scale-[1.02] hover:bg-red-600 hover:text-white shadow-md cursor-not-allowed": loadingPlanId !== null,
                                            "flex justify-center w-full border-2 border-red-600 text-red-600 font-semibold py-3 px-6 rounded-xl transition-colors duration-300 transform hover:scale-[1.02] hover:bg-red-600 hover:text-white shadow-md": loadingPlanId === null
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
                        <div className="relative flex flex-col bg-gray-50 py-8 px-6 rounded-3xl shadow-lg ring-2 ring-red-200 hover:ring-red-600 transition-all duration-300 h-full">
                            <h3 className="text-xl font-semibold text-black mb-4">Plan Plus</h3>
                            <div className="absolute top-0 right-0 -mt-3 mr-6 bg-red-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-md">
                                Más popular
                            </div>
                            <div className="mb-3 py-4 px-1">
                                <div className="flex">
                                    <p className="text-4xl font-bold text-black">{currencyFormat(getPrice(premiumPlan.price))}</p>
                                    <p className="text-sm md:text-md text-black mt-2">{`/${selectedBillingOption.label.toLowerCase()}`}</p>
                                </div>
                                <p className="text-sm text-black">+ {formatCommission(premiumPlan.commissionPercentage)}% comisión por reserva</p>
                            </div>
                            <p className="text-gray-600 mb-3 text-xs leading-relaxed" style={{ textAlign: 'justify' }}>
                                {premiumPlan.description}
                            </p>
                            <button
                                disabled={loadingPlanId !== null}
                                onClick={() => handlePlanSelect(premiumPlan)}
                                className={
                                    clsx(
                                        {
                                            "flex gap-2 justify-center w-full border-2 border-red-600 text-red-600 font-semibold py-3 px-6 rounded-xl transition-colors duration-300 transform hover:scale-[1.02] hover:bg-red-600 hover:text-white shadow-md cursor-not-allowed": loadingPlanId !== null,
                                            "flex justify-center w-full border-2 border-red-600 text-red-600 font-semibold py-3 px-6 rounded-xl transition-colors duration-300 transform hover:scale-[1.02] hover:bg-red-600 hover:text-white shadow-md": loadingPlanId === null
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
                        <div className="relative flex flex-col bg-gray-50 py-8 px-6 rounded-3xl shadow-lg ring-2 ring-red-200 hover:ring-red-600 transition-all duration-300 h-full">
                            <h3 className="text-xl font-semibold text-black mb-4">Plan Élite</h3>
                            <div className="mb-3 py-4 px-1">
                                <div className="flex">
                                    <p className="text-4xl font-bold text-black">{currencyFormat(getPrice(enterprisePlan.price))}</p>
                                    <p className="text-sm md:text-md text-black mt-2">{`/${selectedBillingOption.label.toLowerCase()}`}</p>
                                </div>
                                <p className="text-sm text-black">+ {formatCommission(enterprisePlan.commissionPercentage)}% comisión por reserva</p>
                            </div>
                            <p className="text-gray-600 mb-3 text-xs leading-relaxed" style={{ textAlign: 'justify' }}>
                                {enterprisePlan.description}
                            </p>
                            <button
                                onClick={() => handlePlanSelect(enterprisePlan)}
                                disabled={loadingPlanId !== null}
                                className={
                                    clsx(
                                        {
                                            "flex gap-2 justify-center w-full border-2 border-red-600 text-red-600 font-semibold py-3 px-6 rounded-xl transition-colors duration-300 transform hover:scale-[1.02] hover:bg-red-600 hover:text-white shadow-md cursor-not-allowed": loadingPlanId !== null,
                                            "flex justify-center w-full border-2 border-red-600 text-red-600 font-semibold py-3 px-6 rounded-xl transition-colors duration-300 transform hover:scale-[1.02] hover:bg-red-600 hover:text-white shadow-md": loadingPlanId === null
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
    );
};