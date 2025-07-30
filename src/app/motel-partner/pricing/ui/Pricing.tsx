"use client"
import { BenefitItem, SelectOption } from '@/components';
import { SubscriptionPeriod } from '@/interfaces';
import { currencyFormat } from '@/utils';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io';

type Feature = {
    name: string;
    included: boolean;
    description?: string;
};

type Plan = {
    name: string;
    monthlyPrice: number;
    commission: string;
    description: string;
    features: Feature[];
    isPopular?: boolean;
    ctaText?: string;
};

export const Pricing = () => {

    const billingOptions = [
        { label: 'Mensual', value: 1, periodType: 'MONTHLY' as SubscriptionPeriod },
        { label: 'Semestral', value: 5, periodType: 'SEMESTRAL' as SubscriptionPeriod }, // Ejemplo: 5 meses de pago por 6 meses de servicio
        { label: 'Anual', value: 10, periodType: 'ANNUAL' as SubscriptionPeriod },   // Ejemplo: 10 meses de pago por 12 meses de servicio
    ];

    const [selectedBillingOption, setSelectedBillingOption] = useState(billingOptions[0]);

    const getPrice = (basePrice: number) => {
        return Number(basePrice) * selectedBillingOption.value;
    };



    const plans: Plan[] = [
        {
            name: 'Plan Free',
            monthlyPrice: 0,
            commission: '4%',
            description: 'Ideal para moteles que buscan implementar de forma fácil y sencilla reservas y pagos en línea.',
            features: [
                {
                    name: 'Soporte técnico 24/7',
                    included: true,
                    description: 'Asistencia técnica disponible en todo momento para resolver cualquier problema.'
                },
                {
                    name: 'Cargamos tu información y te capacitamos',
                    included: true,
                    description: 'Nos encargamos de subir toda la información de tu motel y te entrenamos en el uso de la plataforma.'
                },
                {
                    name: 'Visibilidad en la plataforma',
                    included: true,
                    description: 'Tu motel aparecerá en los resultados de búsqueda de nuestra plataforma.'
                },
                {
                    name: 'Notificaciones en tiempo real',
                    included: true,
                    description: 'Recibirás alertas inmediatas sobre nuevas reservas y actividades importantes.'
                },
                {
                    name: 'Dashboard de administración',
                    included: false,
                    description: 'Panel de control avanzado para gestionar todas las operaciones de tu motel.'
                },
                {
                    name: 'Estadísticas de ocupación y rendimiento',
                    included: false,
                    description: 'Métricas detalladas sobre el desempeño y ocupación de tus habitaciones.'
                },
                {
                    name: 'Notificaciones automáticas para clientes',
                    included: false,
                    description: 'Envío automático de recordatorios y confirmaciones a tus clientes.'
                },
                {
                    name: 'Prioridad en los resultados de búsqueda',
                    included: false,
                    description: 'Tu motel aparecerá en mejores posiciones cuando los clientes busquen alojamiento.'
                },
                {
                    name: 'Acceso a métricas de desempeño',
                    included: false,
                    description: 'Indicadores clave para evaluar el rendimiento de tu negocio.'
                },
                {
                    name: 'Reportes avanzados y detallados',
                    included: false,
                    description: 'Informes completos con análisis profundos de tu operación.'
                },
                {
                    name: 'Análisis inteligente del motel',
                    included: false,
                    description: 'Evaluación automatizada del desempeño con recomendaciones de mejora.'
                },
                {
                    name: 'Optimización de tarifas con IA',
                    included: false,
                    description: 'Sistema inteligente que ajusta tus precios según la demanda y competencia.'
                },
                {
                    name: 'Asesoría personalizada',
                    included: false,
                    description: 'Consultoría especializada para mejorar la gestión de tu motel.'
                },
                {
                    name: 'Automatización de mantenimiento',
                    included: false,
                    description: 'Programación automática de limpieza y mantenimiento de habitaciones.'
                },
            ],
            ctaText: 'Comenzar ahora'
        },
        {
            name: 'Plan Start',
            monthlyPrice: 50000,
            commission: '4%',
            description: 'Ideal para moteles que buscan digitalizar y optimizar sus operaciones de manera sencilla.',
            features: [
                {
                    name: 'Soporte técnico 24/7',
                    included: true,
                    description: 'Asistencia técnica prioritaria disponible en todo momento.'
                },
                {
                    name: 'Cargamos tu información y te capacitamos',
                    included: true,
                    description: 'Migración completa de tus datos y capacitación personalizada.'
                },
                {
                    name: 'Visibilidad en la plataforma',
                    included: true,
                    description: 'Presencia destacada en nuestra plataforma con fotos y descripción mejorada.'
                },
                {
                    name: 'Notificaciones en tiempo real',
                    included: true,
                    description: 'Alertas instantáneas por email y SMS para no perder ninguna reserva.'
                },
                {
                    name: 'Dashboard de administración',
                    included: true,
                    description: 'Interfaz intuitiva para gestionar reservas, habitaciones y empleados.'
                },
                {
                    name: 'Estadísticas de ocupación y rendimiento',
                    included: false,
                    description: 'Gráficos y tablas con el desempeño histórico de tu motel.'
                },
                {
                    name: 'Notificaciones automáticas para clientes',
                    included: false,
                    description: 'Mensajes automatizados de confirmación y recordatorio para huéspedes.'
                },
                {
                    name: 'Prioridad en los resultados de búsqueda',
                    included: false,
                    description: 'Posicionamiento preferencial en búsquedas por ubicación y características.'
                },
                {
                    name: 'Acceso a métricas de desempeño',
                    included: false,
                    description: 'KPIs esenciales para tomar decisiones informadas.'
                },
                {
                    name: 'Reportes avanzados y detallados',
                    included: false,
                    description: 'Exportación de datos en múltiples formatos para su análisis.'
                },
                {
                    name: 'Análisis inteligente del motel',
                    included: false,
                    description: 'Diagnóstico automatizado de áreas de oportunidad.'
                },
                {
                    name: 'Optimización de tarifas con IA',
                    included: false,
                    description: 'Ajuste dinámico de precios basado en inteligencia artificial.'
                },
                {
                    name: 'Asesoría personalizada',
                    included: false,
                    description: 'Sesiones mensuales con expertos en gestión hotelera.'
                },
                {
                    name: 'Automatización de mantenimiento',
                    included: false,
                    description: 'Coordinación inteligente del servicio de limpieza y mantenimiento.'
                },
            ],
            ctaText: 'Comenzar ahora'
        },
        {
            name: 'Plan Plus',
            monthlyPrice: 100000,
            commission: '5%',
            description: 'Perfecto para moteles en expansión que desean mejorar su gestión y aumentar sus reservas.',
            features: [
                {
                    name: 'Soporte técnico 24/7',
                    included: true,
                    description: 'Asistencia técnica VIP con tiempo de respuesta garantizado.'
                },
                {
                    name: 'Cargamos tu información y te capacitamos',
                    included: true,
                    description: 'Implementación completa con migración de datos y entrenamiento avanzado.'
                },
                {
                    name: 'Visibilidad en la plataforma',
                    included: true,
                    description: 'Perfil premium con galería ampliada y video promocional.'
                },
                {
                    name: 'Notificaciones en tiempo real',
                    included: true,
                    description: 'Sistema de alertas multicanal (app, email, SMS) para máxima eficiencia.'
                },
                {
                    name: 'Dashboard de administración',
                    included: true,
                    description: 'Panel de control profesional con funciones avanzadas de gestión.'
                },
                {
                    name: 'Estadísticas de ocupación y rendimiento',
                    included: true,
                    description: 'Análisis comparativo con benchmarks del mercado.'
                },
                {
                    name: 'Notificaciones automáticas para clientes',
                    included: true,
                    description: 'Flujos de comunicación personalizables para cada etapa del hospedaje.'
                },
                {
                    name: 'Prioridad en los resultados de búsqueda',
                    included: true,
                    description: 'Posicionamiento destacado en categorías relevantes.'
                },
                {
                    name: 'Acceso a métricas de desempeño',
                    included: true,
                    description: 'Tablero ejecutivo con los indicadores más importantes.'
                },
                {
                    name: 'Reportes avanzados y detallados',
                    included: false,
                    description: 'Análisis predictivos y tendencias del mercado.'
                },
                {
                    name: 'Análisis inteligente del motel',
                    included: false,
                    description: 'Evaluación comparativa con competidores directos.'
                },
                {
                    name: 'Optimización de tarifas con IA',
                    included: false,
                    description: 'Motor de precios que maximiza tu rentabilidad.'
                },
                {
                    name: 'Asesoría personalizada',
                    included: false,
                    description: 'Consultoría estratégica trimestral.'
                },
                {
                    name: 'Automatización de mantenimiento',
                    included: false,
                    description: 'Sistema inteligente que anticipa necesidades de mantenimiento.'
                },
            ],
            isPopular: true,
            ctaText: 'Comenzar ahora'
        },
        {
            name: 'Plan Premium',
            monthlyPrice: 150000,
            commission: '3%',
            description: 'Diseñado para moteles que requieren soluciones avanzadas y un soporte dedicado.',
            features: [
                {
                    name: 'Soporte técnico 24/7',
                    included: true,
                    description: 'Asistencia técnica con gerente de cuenta asignado.'
                },
                {
                    name: 'Cargamos tu información y te capacitamos',
                    included: true,
                    description: 'Implementación white-glove con equipo dedicado y capacitación ejecutiva.'
                },
                {
                    name: 'Visibilidad en la plataforma',
                    included: true,
                    description: 'Perfil empresarial con contenido multimedia profesional y posicionamiento destacado.'
                },
                {
                    name: 'Notificaciones en tiempo real',
                    included: true,
                    description: 'Sistema de alertas empresarial integrado con tus sistemas existentes.'
                },
                {
                    name: 'Dashboard de administración',
                    included: true,
                    description: 'Consola de gestión empresarial con funciones premium.'
                },
                {
                    name: 'Estadísticas de ocupación y rendimiento',
                    included: true,
                    description: 'Business intelligence con datos en tiempo real y pronósticos avanzados.'
                },
                {
                    name: 'Notificaciones automáticas para clientes',
                    included: true,
                    description: 'Comunicación omnicanal totalmente personalizable para tu marca.'
                },
                {
                    name: 'Prioridad en los resultados de búsqueda',
                    included: true,
                    description: 'Posicionamiento premium garantizado en todas las búsquedas relevantes.'
                },
                {
                    name: 'Acceso a métricas de desempeño',
                    included: true,
                    description: 'Tablero ejecutivo con integración a otras herramientas de negocio.'
                },
                {
                    name: 'Reportes avanzados y detallados',
                    included: true,
                    description: 'Reportes ejecutivos personalizados con análisis de ROI.'
                },
                {
                    name: 'Análisis inteligente del motel',
                    included: true,
                    description: 'Diagnóstico continuo con recomendaciones estratégicas.'
                },
                {
                    name: 'Optimización de tarifas con IA',
                    included: true,
                    description: 'Sistema de precios dinámicos con machine learning adaptativo.'
                },
                {
                    name: 'Asesoría personalizada',
                    included: true,
                    description: 'Consultoría mensual con expertos en revenue management.'
                },
                {
                    name: 'Automatización de mantenimiento',
                    included: true,
                    description: 'Plataforma de mantenimiento predictivo con integración IoT.'
                },
            ],
            ctaText: 'Comenzar ahora'
        }
    ];

    return (
        <>
            <div className="flex justify-center mt-10">
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

            {/* Pricing Cards */}
            <div className="px-4 md:px-10 2xl:px-64">
                <div className="mt-10 md:mt-10 grid w-full grid-cols-1 items-stretch gap-7 sm:mt-10 sm:gap-y-0 lg:grid-cols-4">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col bg-gray-50 py-8 px-6 rounded-3xl shadow-lg ring-2 ring-red-200 hover:ring-red-600 transition-all duration-300 h-full"
                        >
                            <h3 className="text-xl font-semibold text-black mb-4">{plan.name}</h3>

                            {plan.isPopular && (
                                <div className="absolute top-0 right-0 -mt-3 mr-6 bg-red-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-md">
                                    Más popular
                                </div>
                            )}

                            <div className="mb-3 py-4 px-1">
                                <div className="flex">
                                    <p className="text-4xl font-bold text-black">
                                        {currencyFormat(getPrice(plan.monthlyPrice))}
                                    </p>
                                    <p className="text-sm md:text-md text-black mt-2">
                                        {`/${selectedBillingOption.label.toLowerCase()}`}
                                    </p>
                                </div>
                                <p className="text-sm text-black">+ {plan.commission} comisión por reserva</p>
                            </div>

                            <p
                                className="text-gray-600 mb-3 text-xs leading-relaxed"
                                style={{ textAlign: 'justify' }}
                            >
                                {plan.description}
                            </p>

                            <Link
                                href="/motel-partner"
                                className={
                                    clsx(
                                        {
                                            "flex justify-center w-full border-2 border-red-600 text-red-600 font-semibold py-3 px-6 rounded-xl transition-colors duration-300 transform hover:scale-[1.02] hover:bg-red-600 hover:text-white shadow-md": !plan.isPopular,
                                            "flex justify-center w-full font-semibold py-3 px-6 rounded-xl transition-colors border-2 border-red-600 duration-300 transform hover:scale-[1.02] bg-red-600 text-white shadow-md": plan.isPopular,
                                        }
                                    )
                                }
                            >
                                {plan.ctaText}
                            </Link>

                            <div className="mt-4 mb-2 border border-gray-400 border-dashed" />

                            <ul className="space-y-4 mt-4 mb-4">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start">
                                        {feature.included ? (
                                            <svg
                                                className="w-4 h-4 text-green-500 flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ) : (
                                            <IoMdClose className="w-4 h-4 text-red-500 flex-shrink-0" />
                                        )}
                                        <BenefitItem
                                            text={feature.name}
                                            tooltipText={feature.description}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};