'use client';

import { useState } from "react";
import { motion } from 'framer-motion';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdBedroomParent, MdOutlineBedroomParent, MdOutlineTimelapse, MdPaid, MdShowChart, MdTrendingDown, MdTrendingFlat, MdTrendingUp } from "react-icons/md";
import { CustomerSatisfaction, MotelFinancialStats, MotelReservationStats, SubscriptionTier } from "@/interfaces";
import { FaCalendarAlt, FaCalendarCheck, FaCalendarDay, FaCalendarPlus, FaCalendarWeek, FaRegCalendarPlus, FaStar } from "react-icons/fa";
import { BiSolidCalendarExclamation } from "react-icons/bi";
import { LuCalendarCheck2, LuCalendarClock } from "react-icons/lu";
import { formatDate } from "@/utils";

interface Props {
    subscription: SubscriptionTier;
    stats: MotelReservationStats;
    financialStats: MotelFinancialStats;
    satisfactionData: CustomerSatisfaction;
}

export const ReservationDashboard = ({ stats, financialStats, subscription, satisfactionData }: Props) => {

    // Estados separados para cada sección
    const [reservationsOpen, setReservationsOpen] = useState(true);
    const [financialOpen, setFinancialOpen] = useState(true);
    const [satisfactionOpen, setSatisfactionOpen] = useState(true);

    // Funciones de toggle separadas para cada sección
    const toggleReservations = () => {
        setReservationsOpen(!reservationsOpen);
    };

    const toggleFinancial = () => {
        setFinancialOpen(!financialOpen);
    };

    const toggleSatisfaction = () => {
        setSatisfactionOpen(!satisfactionOpen);
    };

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Determinar el ícono y color para el cambio porcentual
    const getTrendIcon = () => {
        if (financialStats.percentChange > 0) {
            return <MdTrendingUp className="h-6 w-6 text-green-500" />;
        } else if (financialStats.percentChange < 0) {
            return <MdTrendingDown className="h-6 w-6 text-red-500" />;
        } else {
            return <MdTrendingFlat className="h-6 w-6 text-gray-500" />;
        }
    };

    // Determinar el texto del cambio porcentual
    const getTrendText = () => {
        if (financialStats.percentChange > 0) {
            return `↑ ${Math.abs(financialStats.percentChange)}%`;
        } else if (financialStats.percentChange < 0) {
            return `↓ ${Math.abs(financialStats.percentChange)}%`;
        } else {
            return "0%";
        }
    };

    // Determinar el color del texto del cambio
    const getTrendColor = () => {
        if (financialStats.percentChange > 0) {
            return "text-green-500";
        } else if (financialStats.percentChange < 0) {
            return "text-red-500";
        } else {
            return "text-gray-500";
        }
    };

    return (
        <>

            {
                subscription === "FREE" && (
                    <div className="">
                        <div
                            className="flex p-4 mb-4 text-sm text-indigo-700 rounded-xl border-2 border-indigo-600 bg-white"
                            role="alert"
                        >
                            <div>
                                <span className="font-semibold text-md md:text-lg ">¡Obtén más metricas de desempeño al cambiarte al Plan Basic!</span>
                                <div className="space-y-3 mt-4">
                                    <div className="text-xs md:text-sm" >1. Visualiza métricas detalladas de ocupación por habitación</div>
                                    <div className="text-xs md:text-sm" >2. Monitorea en tiempo real el estado de cada habitación</div>
                                    <div className="text-xs md:text-sm" >3. Identifica habitaciones disponibles, en servicio o en limpieza</div>
                                    <div className="text-xs md:text-sm" >4. Accede a herramientas que optimizan la gestión del motel</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }


            <div className="mb-10" >
                {/* Sección de Reservas */}
                <div className="w-full mt-10">
                    <div className="bg-white shadow-md rounded-lg p-5">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Reservas</h2>
                            {/* Botón de toggle para la sección de Reservas */}
                            <button onClick={toggleReservations}>
                                {reservationsOpen ? (
                                    <IoIosArrowUp className="w-6 h-6 text-gray-600" />
                                ) : (
                                    <IoIosArrowDown className="w-6 h-6 text-gray-600" />
                                )}
                            </button>
                        </div>
                        {/* Motion.div ahora usa reservationsOpen */}
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: reservationsOpen ? 'auto' : 0, opacity: reservationsOpen ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-4">
                                <div className="my-6">
                                    <div className="grid grid-cols md:grid-cols-3 gap-5">
                                        <div className="w-full md:px-2">
                                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
                                                <div className="p-3 rounded-full bg-green-600 bg-opacity-75">
                                                    <FaCalendarPlus className="h-7 w-7 text-white" />
                                                </div>

                                                <div className="mx-5">
                                                    <h4 className="text-2xl font-semibold text-gray-700">{stats.dailyRequests}</h4>
                                                    <div className="text-gray-500 text-xs md:text-sm">Reservas solicitadas</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full md:px-2">
                                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
                                                <div className="p-3 rounded-full bg-orange-600 bg-opacity-75">
                                                    <FaCalendarCheck className="h-7 w-7 text-white" />
                                                </div>

                                                <div className="mx-5">
                                                    <h4 className="text-2xl font-semibold text-gray-700">{stats.confirmedToday}</h4>
                                                    <div className="text-gray-500 text-xs md:text-sm">Reservas confirmadas</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full md:px-2">
                                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
                                                <div className="p-3 rounded-full bg-blue-600 bg-opacity-75">
                                                    <MdPaid className="h-7 w-7 text-white" />
                                                </div>

                                                <div className="mx-5">
                                                    <h4 className="text-2xl font-semibold text-gray-700">{stats.paidToday}</h4>
                                                    <div className="text-gray-500 text-xs md:text-sm">Reservas pagadas</div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="w-full md:px-2">
                                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
                                                <div className="p-3 rounded-full bg-purple-600 bg-opacity-75">
                                                    <LuCalendarClock className="h-7 w-7 text-white" />
                                                </div>

                                                <div className="mx-5">
                                                    <h4 className="text-2xl font-semibold text-gray-700">{stats.pendingToday}</h4>
                                                    <div className="text-gray-500 text-xs md:text-sm">Reservas en espera para tomar servicio</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full md:px-2">
                                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
                                                <div className="p-3 rounded-full bg-red-600 bg-opacity-75">
                                                    <BiSolidCalendarExclamation className="h-7 w-7 text-white" />
                                                </div>

                                                <div className="mx-5">
                                                    <h4 className="text-2xl font-semibold text-gray-700">{stats.notRespondedToday}</h4>
                                                    <div className="text-gray-500 text-xs md:text-sm">Reservas solicitadas no respondidas</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full md:px-2">
                                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
                                                <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                                                    <LuCalendarCheck2 className="h-7 w-7 text-white" />
                                                </div>

                                                <div className="mx-5">
                                                    <h4 className="text-2xl font-semibold text-gray-700">{stats.completedToday}</h4>
                                                    <div className="text-gray-500 text-xs md:text-sm">Reservas finalizadas correctamente</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Sección de Ingresos Financieros */}
                <div className="w-full mt-10">
                    <div className="bg-white shadow-md rounded-lg p-5">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Ingresos Financieros</h2>
                            {/* Botón de toggle para la sección de Ingresos */}
                            <button onClick={toggleFinancial}>
                                {financialOpen ? (
                                    <IoIosArrowUp className="w-6 h-6 text-gray-600" />
                                ) : (
                                    <IoIosArrowDown className="w-6 h-6 text-gray-600" />
                                )}
                            </button>
                        </div>
                        {/* Motion.div ahora usa financialOpen */}
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: financialOpen ? 'auto' : 0, opacity: financialOpen ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            {financialStats.hasData ? (
                                <div className="mt-4">
                                    <div className="my-6">
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                                            {/* Ingresos de hoy con comparativa */}
                                            <div className="w-full px-2">
                                                <div className="flex flex-col px-5 py-6 shadow-sm rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                                                    <div className="flex items-center mb-2">
                                                        <div className="p-3 rounded-full bg-blue-600 bg-opacity-75 mr-4">
                                                            <FaCalendarDay className="h-7 w-7 text-white" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-2xl font-semibold text-gray-800">{formatMoney(financialStats.todayRevenue)}</h4>
                                                            <div className="text-gray-600 text-sm">Ingresos hoy</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center mt-2">
                                                        {getTrendIcon()}
                                                        <span className={`ml-2 text-sm font-medium ${getTrendColor()}`}>
                                                            {getTrendText()} vs ayer
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Ingresos de ayer */}
                                            <div className="w-full px-2">
                                                <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-100">
                                                    <div className="p-3 rounded-full bg-gray-600 bg-opacity-75 mr-4">
                                                        <FaCalendarDay className="h-7 w-7 text-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-2xl font-semibold text-gray-800">{formatMoney(financialStats.yesterdayRevenue)}</h4>
                                                        <div className="text-gray-600 text-sm">Ingresos ayer</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Ingresos de la semana */}
                                            <div className="w-full px-2">
                                                <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                                                    <div className="p-3 rounded-full bg-green-600 bg-opacity-75 mr-4">
                                                        <FaCalendarWeek className="h-7 w-7 text-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-2xl font-semibold text-gray-800">{formatMoney(financialStats.weekRevenue)}</h4>
                                                        <div className="text-gray-600 text-sm">Ingresos esta semana</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Ingresos del mes */}
                                            <div className="w-full px-2">
                                                <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100">
                                                    <div className="p-3 rounded-full bg-purple-600 bg-opacity-75 mr-4">
                                                        <FaCalendarAlt className="h-7 w-7 text-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-2xl font-semibold text-gray-800">{formatMoney(financialStats.monthRevenue)}</h4>
                                                        <div className="text-gray-600 text-sm">Ingresos este mes</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Gráfico de tendencia */}
                                        <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-gray-200">
                                            <div className="flex items-center mb-4">
                                                <MdShowChart className="h-6 w-6 text-blue-500 mr-2" />
                                                <h3 className="text-lg font-semibold">Tendencia de ingresos</h3>
                                            </div>

                                            <div className="bg-white p-4 rounded-md">
                                                {financialStats.hasData ? (
                                                    <div className="flex items-end h-32 justify-between">
                                                        {/* Días de la semana */}
                                                        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, index) => (
                                                            <div key={day} className="flex flex-col items-center">
                                                                <div className="text-xs text-gray-500 mb-1">{day}</div>
                                                                <div
                                                                    className="w-8 bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-md"
                                                                    style={{ height: `${30 + Math.random() * 70}%` }}
                                                                ></div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-8 text-gray-500">
                                                        No hay suficientes datos para mostrar la tendencia
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-4 p-8 text-center bg-yellow-50 rounded-lg border border-yellow-100">
                                    <MdPaid className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                                    <h3 className="text-md md:text-xl font-semibold text-gray-700 mb-2">Sin datos de ingresos aún</h3>
                                    <p className="text-gray-600 text-xs md:text-base">
                                        Las estadísticas financieras se generarán automáticamente cuando haya suficiente información de tus ingresos.
                                    </p>
                                </div>

                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Sección de Satisfacción de Clientes */}
                <div className="w-full mt-10">
                    <div className="bg-white shadow-md rounded-lg p-5">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Satisfacción de Clientes</h2>
                            <button onClick={toggleSatisfaction}>
                                {satisfactionOpen ? (
                                    <IoIosArrowUp className="w-6 h-6 text-gray-600" />
                                ) : (
                                    <IoIosArrowDown className="w-6 h-6 text-gray-600" />
                                )}
                            </button>
                        </div>
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: satisfactionOpen ? 'auto' : 0, opacity: satisfactionOpen ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            {!satisfactionData.hasRatings ? (
                                <div className="mt-4 p-8 text-center bg-blue-50 rounded-lg border border-blue-100">
                                    <div className="flex justify-center" >
                                        <div className="bg-white p-2 w-fit rounded-full" >
                                            <FaStar className="h-7 w-7 text-blue-500 mx-auto" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                        {satisfactionData.message}
                                    </h3>
                                    <p className="text-gray-600">
                                        Las calificaciones aparecerán cuando los clientes califiquen sus estadías
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-4">
                                    <div className="flex flex-col md:flex-row items-center">
                                        {/* Calificación general */}
                                        <div className="text-center p-6">
                                            <div className="text-5xl font-bold text-blue-600">
                                                {satisfactionData.averageRating}
                                            </div>
                                            <div className="flex justify-center my-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <FaStar
                                                        key={star}
                                                        className={`mx-0.5 ${star <= Math.round(satisfactionData.averageRating!)
                                                            ? "text-yellow-400"
                                                            : "text-gray-300"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <div className="text-gray-500">de 5 estrellas</div>
                                            <div className="mt-2 text-sm text-gray-600">
                                                Basado en {satisfactionData.totalRatings} opiniones
                                            </div>
                                        </div>

                                        {/* Detalle de calificaciones */}
                                        <div className="flex-1 md:pl-6">
                                            {[5, 4, 3, 2, 1].map((stars) => (
                                                <div key={stars} className="flex items-center mb-2">
                                                    <div className="w-10 text-gray-600">{stars} estrellas</div>
                                                    <div className="flex-1 mx-2">
                                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                            <div
                                                                className="bg-yellow-400 h-2.5 rounded-full"
                                                                style={{
                                                                    width: `${satisfactionData.ratingDistribution![stars as keyof typeof satisfactionData.ratingDistribution]}%`
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <div className="w-10 text-right text-gray-600">
                                                        {satisfactionData.ratingDistribution![stars as keyof typeof satisfactionData.ratingDistribution]}%
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Comentarios recientes */}
                                    <div className="mt-6">
                                        <h3 className="font-medium mb-3">Comentarios Recientes</h3>
                                        <div className="space-y-3">
                                            {satisfactionData.recentComments!.map((comment, index) => (
                                                <div key={index} className="p-3 border rounded-lg">
                                                    <div className="flex items-center mb-2">
                                                        <div className="flex mr-2">
                                                            {[...Array(5)].map((_, i) => (
                                                                <FaStar
                                                                    key={i}
                                                                    className={`text-sm ${i < comment.rating
                                                                        ? "text-yellow-400"
                                                                        : "text-gray-300"
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="font-medium">{comment.userName}</span>
                                                        <span className="text-gray-500 text-sm ml-auto">
                                                            {new Date(comment.date).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600 text-sm">
                                                        {comment.comment}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>

        </>
    )
}