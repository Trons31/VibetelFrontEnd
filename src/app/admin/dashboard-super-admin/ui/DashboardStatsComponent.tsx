'use client';

import { useState, useEffect } from 'react';

import { IoBarChartSharp } from 'react-icons/io5';
import { RiBuilding2Fill, RiMapPinRangeFill } from 'react-icons/ri';
import { AiFillHome } from 'react-icons/ai';
import { FaCalendarDays, FaDollarSign, FaUsers } from 'react-icons/fa6';
import { IoMdTrendingUp } from 'react-icons/io';
import axios from 'axios';

interface DashboardStats {
    totalMotels: number;
    approvedMotels: number;
    totalRooms: number;
    totalCities: number;
    totalReservations: number;
    todayReservations: number;
    topMotel: {
        motelName: string;
        reservationCount: number;
    };
    totalEarnings: number;
    todayEarnings: number;
    weekEarnings: number;
    monthEarnings: number;
}

interface TopMotel {
    motelName: string;
    reservationCount: number;
    totalRevenue: number;
}

interface Props {
    accessToken: string;
}

export default function DashboardStatsComponent({ accessToken }: Props) {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [topMotels, setTopMotels] = useState<TopMotel[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('month');


    useEffect(() => {
        fetchStats();
        fetchTopMotels();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_ROUTE}statistics/dashboard-stats`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setStats(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching rooms:', error);
            setLoading(false);
        }
    };

    const fetchTopMotels = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_ROUTE}statistics/top-performing-motels?limit=5`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setTopMotels(response.data);
        } catch (error) {
            console.error('Error fetching top motels:', error);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP'
        }).format(amount);
    };

    const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }: {
        icon: any;
        title: string;
        value: string | number;
        subtitle?: string;
        color: string;
        trend?: string;
    }) => (
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                {trend && (
                    <div className="flex items-center text-green-600">
                        <IoMdTrendingUp className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">{trend}</span>
                    </div>
                )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
            <p className="text-gray-600 text-sm font-medium">{title}</p>
            {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen p-3">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-300 rounded mb-6 w-64"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen md:p-3">
            <div className="w-full py-4 md:px-10 mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight leading-tight">
                        Dashboard de Administración
                    </h1>
                    <p className="text-sm md:text-base text-gray-600">
                        Resumen general del sistema de moteles
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={RiBuilding2Fill}
                        title="Total de Moteles"
                        value={stats?.totalMotels || 0}
                        subtitle={`${stats?.approvedMotels || 0} aprobados`}
                        color="bg-blue-600"
                        trend="+12%"
                    />

                    <StatCard
                        icon={AiFillHome}
                        title="Habitaciones Totales"
                        value={stats?.totalRooms || 0}
                        color="bg-green-600"
                        trend="+8%"
                    />

                    <StatCard
                        icon={RiMapPinRangeFill}
                        title="Ciudades con Presencia"
                        value={stats?.totalCities || 0}
                        color="bg-purple-600"
                        trend="+2"
                    />

                    <StatCard
                        icon={FaCalendarDays}
                        title="Reservas Totales"
                        value={stats?.totalReservations || 0}
                        subtitle={`${stats?.todayReservations || 0} hoy`}
                        color="bg-orange-600"
                        trend="+15%"
                    />
                </div>

                {/* Earnings Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={FaDollarSign}
                        title="Ganancias Totales"
                        value={formatCurrency(stats?.totalEarnings || 0)}
                        color="bg-emerald-600"
                        trend="+18%"
                    />

                    <StatCard
                        icon={FaDollarSign}
                        title="Ganancias del Mes"
                        value={formatCurrency(stats?.monthEarnings || 0)}
                        color="bg-teal-600"
                        trend="+22%"
                    />

                    <StatCard
                        icon={FaDollarSign}
                        title="Ganancias de la Semana"
                        value={formatCurrency(stats?.weekEarnings || 0)}
                        color="bg-cyan-600"
                        trend="+5%"
                    />

                    <StatCard
                        icon={FaDollarSign}
                        title="Ganancias de Hoy"
                        value={formatCurrency(stats?.todayEarnings || 0)}
                        color="bg-indigo-600"
                        trend="+10%"
                    />
                </div>

                {/* Top Performing Motels */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-md md:text-lg font-bold text-gray-900 flex items-center">
                            <IoBarChartSharp className="w-6 h-6 mr-2 text-blue-600" />
                            Moteles con Mejor Desempeño
                        </h2>
                    </div>

                    <div className="overflow-hidden">
                        <div className="space-y-4">
                            {topMotels.map((motel, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${index === 0 ? 'bg-yellow-500' :
                                            index === 1 ? 'bg-gray-400' :
                                                index === 2 ? 'bg-amber-600' : 'bg-blue-600'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <div className="ml-3">
                                            <p className="font-semibold text-xs md:text-base text-gray-900">{motel.motelName}</p>
                                            <p className="text-xs md:text-sm text-gray-600">{motel.reservationCount} reservas</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-green-600">
                                            {formatCurrency(motel.totalRevenue)}
                                        </p>
                                        <p className="text-xs md:text-sm text-gray-500">Ingresos totales</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Additional Info Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Best Performing Motel */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-md md:text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <FaUsers className="w-5 h-5 mr-2 text-green-600" />
                            Motel Más Popular
                        </h3>
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <RiBuilding2Fill className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">
                                {stats?.topMotel.motelName}
                            </h4>
                            <p className="text-3xl font-bold text-green-600 mb-1">
                                {stats?.topMotel.reservationCount}
                            </p>
                            <p className="text-xs md:text-base  text-gray-600">reservas realizadas</p>
                        </div>
                    </div>

                    {/* System Overview */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-md md:text-lg font-bold text-gray-900 mb-4">Resumen del Sistema</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-xs md:text-base text-gray-600">Tasa de Aprobación</span>
                                <span className="font-bold text-xs md:text-base text-blue-600">
                                    {stats ? Math.round((stats.approvedMotels / stats.totalMotels) * 100) : 0}%
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs md:text-base text-gray-600">Reservas por Día</span>
                                <span className="font-bold text-xs md:text-base text-green-600">
                                    {stats ? Math.round(stats.totalReservations / 30) : 0}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs md:text-base text-gray-600">Promedio Habitaciones/Motel</span>
                                <span className="font-bold text-xs md:text-base text-purple-600">
                                    {stats ? Math.round(stats.totalRooms / stats.totalMotels) : 0}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs md:text-base text-gray-600">Ingreso Promedio/Reserva</span>
                                <span className="font-bold text-xs md:text-base text-orange-600">
                                    {stats ? formatCurrency(stats.totalEarnings / stats.totalReservations) : formatCurrency(0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}