'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

import { LuCalendarRange } from 'react-icons/lu';
import { FaCloudDownloadAlt, FaWallet } from 'react-icons/fa';
import { IoOptionsSharp, IoReceipt } from 'react-icons/io5';
import { BsFillBarChartLineFill } from 'react-icons/bs';
import { TbPercentage } from 'react-icons/tb';
import { IoMdTrendingUp } from 'react-icons/io';
import { formatDate } from '@/utils';

type Period = 'today' | 'week' | 'month' | 'custom';

interface Reservation {
    id: string;
    date: string; // ISO date
    total: number;
    commission: number;
    motelNet: number;
}

interface ReportData {
    commissionPercentage: number;
    reservations: Reservation[];
}

interface Props {
    accessToken: string;
    commissionPercentage: number;
}

const fmtCOP = (n: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

const fmtDateShort = (iso: string) =>
    new Date(iso + 'T00:00:00').toLocaleDateString('es-CO', { day: '2-digit', month: 'short' });

const getTodayRange = () => {
    const d = new Date();
    const start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const end = new Date(start);
    return { start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) };
};

const getWeekRange = () => {
    const d = new Date();
    const day = d.getDay(); // 0-6 (Sunday-Saturday)
    const diffToMonday = (day + 6) % 7; // Monday as start
    const start = new Date(d);
    start.setDate(d.getDate() - diffToMonday);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) };
};

const getMonthRange = () => {
    const d = new Date();
    const start = new Date(d.getFullYear(), d.getMonth(), 1);
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    return { start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) };
};

export const DashboardReport = ({ accessToken, commissionPercentage }: Props) => {
    const [period, setPeriod] = useState<Period>('today');
    const [commissionPct, setCommissionPct] = useState<number>(commissionPercentage);

    const initialRange = useMemo(() => {
        if (period === 'today') return getTodayRange();
        if (period === 'week') return getWeekRange();
        if (period === 'month') return getMonthRange();
        return getWeekRange();
    }, [period]);

    const [startDate, setStartDate] = useState<string>(initialRange.start);
    const [endDate, setEndDate] = useState<string>(initialRange.end);
    const [report, setReport] = useState<ReportData | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch data when range changes
    useEffect(() => {
        const { start, end } = initialRange;
        setStartDate(start);
        setEndDate(end);
    }, [initialRange]);

    useEffect(() => {
        const fetchReportData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_ROUTE}motel/reports?startDate=${startDate}&endDate=${endDate}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                console.log(response.data);
                setReport(response.data);
            } catch (error) {
                console.error('Error fetching report:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReportData();
    }, [startDate, endDate, accessToken]);

    // Group reservations by day
    const dayBuckets = useMemo(() => {
        if (!report?.reservations) return [];

        const bucketsMap: { [key: string]: { reservations: number; grossRevenue: number } } = {};

        report.reservations.forEach((reservation) => {
            const date = reservation.date.split('T')[0]; // Get YYYY-MM-DD part

            if (!bucketsMap[date]) {
                bucketsMap[date] = { reservations: 0, grossRevenue: 0 };
            }

            bucketsMap[date].reservations += 1;
            bucketsMap[date].grossRevenue += reservation.total;
        });

        // Convert to array and sort by date
        return Object.entries(bucketsMap)
            .map(([date, data]) => ({ date, ...data }))
            .sort((a, b) => a.date.localeCompare(b.date));
    }, [report]);

    const totals = useMemo(() => {
        if (!report) return null;

        const totalReservations = report.reservations.length;
        const gross = report.reservations.reduce((sum, res) => sum + res.total, 0);
        const commission = report.reservations.reduce((sum, res) => sum + res.commission, 0);
        const net = report.reservations.reduce((sum, res) => sum + res.motelNet, 0);
        const avgTicket = totalReservations > 0 ? Math.round(gross / totalReservations) : 0;

        return { totalReservations, gross, commission, net, avgTicket };
    }, [report]);

    const chartData = useMemo(() => {
        return dayBuckets.map((b) => ({
            name: fmtDateShort(b.date),
            Ingresos: b.grossRevenue,
            Reservas: b.reservations,
            Comisión: Math.round((commissionPct / 100) * b.grossRevenue),
            Neto: Math.round(b.grossRevenue * (1 - commissionPct / 100)),
        }));
    }, [dayBuckets, commissionPct]);

    return (
        <div className="min-h-screen rounded-lg bg-white">
            {/* Header */}
            <div className="sticky top-0 z-10 backdrop-blur rounded-t-xl supports-[backdrop-filter]:bg-white/70 border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-6 py-4 block md:flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-2xl bg-black text-white">
                            <BsFillBarChartLineFill className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="text-lg md:text-2xl font-semibold tracking-tight">Reportes de Ingresos</h1>
                            <p className="text-slate-500 text-sm">Resumen por día, semana o mes, filtra y exporta</p>
                        </div>
                    </div>
                    <div className="flex mt-3 md:mt-0 justify-end md:justify-start items-center gap-2">
                        <button
                            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
                            onClick={() => window.print()}
                        >
                            <FaCloudDownloadAlt className="h-4 w-4" /> Exportar
                        </button>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <section className="mx-auto w-full px-3 md:px-20 pt-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                            <IoOptionsSharp className="h-3.5 w-3.5" /> Filtros
                        </span>

                        {/* Period Pills */}
                        <div className="flex flex-wrap gap-2">
                            {([
                                { key: 'today', label: 'Hoy' },
                                { key: 'week', label: 'Esta semana' },
                                { key: 'month', label: 'Este mes' },
                                { key: 'custom', label: 'Personalizado' },
                            ] as { key: Period; label: string }[]).map((opt) => (
                                <button
                                    key={opt.key}
                                    onClick={() => setPeriod(opt.key)}
                                    className={
                                        'rounded-full px-4 py-2 text-sm transition ' +
                                        (period === opt.key
                                            ? 'bg-black text-white shadow'
                                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700')
                                    }
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>

                        {/* Date inputs */}
                        <div className="ml-auto flex flex-wrap items-center gap-2">
                            <div className="block space-y-2 md:space-y-0 md:flex flex-wrap items-center gap-2 rounded-2xl border border-slate-300 bg-white px-3 py-2 w-full sm:w-auto">
                                <LuCalendarRange className="h-4 w-4 text-slate-500" />
                                <input
                                    type="date"
                                    className="outline-none text-sm w-full sm:w-auto"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                                <span className="text-slate-400 hidden md:block">—</span>
                                <input
                                    type="date"
                                    className="outline-none text-sm w-full sm:w-auto"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>

                            {/* Commission */}
                            <div className="flex w-full md:w-fit items-center gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2">
                                <TbPercentage className="h-4 w-4 text-slate-500" />
                                <input
                                    disabled
                                    type="number"
                                    min={0}
                                    max={50}
                                    step={0.5}
                                    value={commissionPct}
                                    className="w-16 text-sm bg-transparent outline-none"
                                />
                                <span className="text-sm text-slate-600">% comisión</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* KPI Cards */}
            <section className="mx-auto w-full px-4 md:px-20 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Reservas"
                        value={totals?.totalReservations ?? 0}
                        icon={<IoReceipt className="h-5 w-5" />}
                        caption={`${startDate} a ${endDate}`}
                    />
                    <StatCard
                        title="Ingresos brutos"
                        value={fmtCOP(totals?.gross ?? 0)}
                        icon={<IoMdTrendingUp className="h-5 w-5" />}
                        caption={"Antes de comisión"}
                    />
                    <StatCard
                        title="Comisión plataforma"
                        value={fmtCOP(totals?.commission ?? 0)}
                        icon={<TbPercentage className="h-5 w-5" />}
                        caption={`${commissionPct}% del total`}
                    />
                    <StatCard
                        title="Ingreso neto motel"
                        value={fmtCOP(totals?.net ?? 0)}
                        icon={<FaWallet className="h-5 w-5" />}
                        caption={"Después de comisión"}
                    />
                </div>
            </section>

            {/* Detailed table */}
            <section className="mx-auto w-full px-3 md:px-20 pt-6 pb-16">
                <div className="rounded-3xl border border-slate-200 bg-white p-0 shadow-sm overflow-hidden">
                    <div className="px-4 md:px-6 py-4 flex items-center justify-between border-b border-slate-200">
                        <h3 className="text-xs md:text-sm font-medium text-slate-700">Detalle por día</h3>
                        <span className="text-xs text-slate-500">{dayBuckets.length} filas</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-slate-50 text-slate-600">
                                <tr>
                                    <Th className='text-xs md:text-sm' >Fecha</Th>
                                    <Th className="text-xs md:text-sm text-right">Reservas</Th>
                                    <Th className="text-xs md:text-sm text-right">Ingresos brutos</Th>
                                    <Th className="text-xs md:text-sm text-right">Comisión</Th>
                                    <Th className="text-xs md:text-sm text-right">Ingreso neto</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && (
                                    <tr>
                                        <td colSpan={5} className="p-6 text-center text-slate-500">Cargando…</td>
                                    </tr>
                                )}
                                {!loading && dayBuckets.map((b) => {
                                    const commission = Math.round((commissionPct / 100) * b.grossRevenue);
                                    const net = b.grossRevenue - commission;
                                    return (
                                        <tr key={b.date} className="border-t border-slate-200 hover:bg-slate-50/60">
                                            <Td className='text-xs md:text-sm' >{new Date(b.date + 'T00:00:00').toLocaleDateString('es-CO', { weekday: 'short', day: '2-digit', month: 'short' })}</Td>
                                            <Td className="text-xs md:text-sm text-right font-medium">{b.reservations}</Td>
                                            <Td className="text-xs md:text-sm text-right">{fmtCOP(b.grossRevenue)}</Td>
                                            <Td className="text-xs md:text-sm text-right">{fmtCOP(commission)}</Td>
                                            <Td className="text-xs md:text-sm text-right">{fmtCOP(net)}</Td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            {/* Footer summary */}
                            {totals && (
                                <tfoot>
                                    <tr className="border-t-2 border-slate-300 bg-slate-50">
                                        <Td className="font-semibold">Totales</Td>
                                        <Td className="text-right font-semibold">{totals.totalReservations}</Td>
                                        <Td className="text-right font-semibold">{fmtCOP(totals.gross)}</Td>
                                        <Td className="text-right font-semibold">{fmtCOP(totals.commission)}</Td>
                                        <Td className="text-right font-semibold">{fmtCOP(totals.net)}</Td>
                                    </tr>
                                </tfoot>
                            )}
                        </table>
                    </div>
                </div>

                {/* Footer stats */}
                {totals && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <MiniStat
                            label="Reserva promedio"
                            value={fmtCOP(totals.avgTicket)}
                            icon={<IoReceipt className="h-4 w-4" />}
                        />
                        <MiniStat
                            label="% Comisión aplicada"
                            value={`${commissionPct}%`}
                            icon={<TbPercentage className="h-4 w-4" />}
                        />
                        <MiniStat
                            label="Rango seleccionado"
                            value={`${formatDate(startDate)} a  ${formatDate(endDate)}`}
                            icon={<LuCalendarRange className="h-4 w-4" />}
                        />
                    </div>
                )}
            </section>
        </div>
    );
};

function Th({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) {
    return (
        <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide ${className}`}>{children}</th>
    );
}

function Td({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) {
    return <td className={`px-4 md:px-6 py-3 ${className}`}>{children}</td>;
}

function StatCard({
    title,
    value,
    caption,
    icon,
}: {
    title: string;
    value: string | number;
    caption?: string;
    icon: React.ReactNode;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">{title}</p>
                    <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
                    {caption && <p className="mt-1 text-xs text-slate-500">{caption}</p>}
                </div>
                <div className="p-2 rounded-2xl bg-slate-900 text-white">{icon}</div>
            </div>
        </motion.div>
    );
}

function MiniStat({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between">
            <div>
                <p className="text-xs text-slate-500">{label}</p>
                <p className="text-sm md:text-md font-semibold tracking-tight">{value}</p>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 text-white">{icon}</div>
        </div>
    );
}