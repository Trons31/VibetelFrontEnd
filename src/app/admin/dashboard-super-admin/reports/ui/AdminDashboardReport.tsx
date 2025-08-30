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

interface MotelReport {
  motelId: string;
  motelName: string;
  location: string;
  commissionPercentage: number;
  totalReservations: number;
  grossRevenue: number;
  commission: number;
  netRevenue: number;
  error?: string;
}

interface AdminReportData {
  startDate: string;
  endDate: string;
  reports: MotelReport[];
  totals: {
    totalReservations: number;
    totalGrossRevenue: number;
    totalCommission: number;
    totalNetRevenue: number;
  };
}

interface Props {
  accessToken: string;
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
  const day = d.getDay();
  const diffToMonday = (day + 6) % 7;
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

export const AdminDashboardReport = ({ accessToken }: Props) => {
  const [period, setPeriod] = useState<Period>('today');
  const initialRange = useMemo(() => {
    if (period === 'today') return getTodayRange();
    if (period === 'week') return getWeekRange();
    if (period === 'month') return getMonthRange();
    return getWeekRange();
  }, [period]);

  const [startDate, setStartDate] = useState<string>(initialRange.start);
  const [endDate, setEndDate] = useState<string>(initialRange.end);
  const [report, setReport] = useState<AdminReportData | null>(null);
  const [loading, setLoading] = useState(false);

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
          `${process.env.NEXT_PUBLIC_API_ROUTE}motel/admin/reports?startDate=${startDate}&endDate=${endDate}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setReport(response.data);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [startDate, endDate, accessToken]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-4 block md:flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-black text-white">
              <BsFillBarChartLineFill className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-semibold tracking-tight">Reportes de Administración</h1>
              <p className="text-slate-500 text-sm">Resumen de todos los moteles · Filtra y exporta</p>
            </div>
          </div>
          <div className="flex justify-end md:justify-start mt-3 md:mt-0 items-center gap-2">
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
      <section className="mx-auto max-w-7xl px-6 pt-6">
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
            </div>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="mx-auto max-w-7xl px-6 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Reservas"
            value={report?.totals.totalReservations ?? 0}
            icon={<IoReceipt className="h-5 w-5" />}
            caption={`${report?.startDate ?? ''} → ${report?.endDate ?? ''}`}
          />
          <StatCard
            title="Ingresos brutos totales"
            value={fmtCOP(report?.totals.totalGrossRevenue ?? 0)}
            icon={<IoMdTrendingUp className="h-5 w-5" />}
            caption={"Todos los moteles"}
          />
          <StatCard
            title="Ganancia de la plataforma"
            value={fmtCOP(report?.totals.totalCommission ?? 0)}
            icon={<TbPercentage className="h-5 w-5" />}
            caption={"Comisión total"}
          />
          <StatCard
            title="Ingreso neto moteles"
            value={fmtCOP(report?.totals.totalNetRevenue ?? 0)}
            icon={<FaWallet className="h-5 w-5" />}
            caption={"Después de comisión"}
          />
        </div>
      </section>

      {/* Detailed table */}
      <section className="mx-auto max-w-7xl px-6 pt-6 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-0 shadow-sm overflow-hidden">
          <div className="px-4 md:px-6 py-4 flex items-center justify-between border-b border-slate-200">
            <h3 className="text-sm font-medium text-slate-700">Detalle por motel</h3>
            <span className="text-xs text-slate-500">{report?.reports.length ?? 0} moteles</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <Th>Motel</Th>
                  <Th>Ubicación</Th>
                  <Th className="text-right">Reservas</Th>
                  <Th className="text-right">Ingresos brutos</Th>
                  <Th className="text-right">Comisión</Th>
                  <Th className="text-right">% Comisión</Th>
                  <Th className="text-right">Ingreso neto</Th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-slate-500">Cargando…</td>
                  </tr>
                )}
                {!loading && report?.reports.map((motel) => (
                  <tr key={motel.motelId} className="border-t border-slate-200 hover:bg-slate-50/60">
                    <Td className="font-medium">{motel.motelName}</Td>
                    <Td>{motel.location}</Td>
                    <Td className="text-right">{motel.totalReservations}</Td>
                    <Td className="text-right">{fmtCOP(motel.grossRevenue)}</Td>
                    <Td className="text-right">{fmtCOP(motel.commission)}</Td>
                    <Td className="text-right">{motel.commissionPercentage}%</Td>
                    <Td className="text-right">{fmtCOP(motel.netRevenue)}</Td>
                  </tr>
                ))}
              </tbody>
              {report && (
                <tfoot>
                  <tr className="border-t-2 border-slate-300 bg-slate-50">
                    <td colSpan={2} className="font-semibold">Totales</td>
                    <Td className="text-right font-semibold">{report.totals.totalReservations}</Td>
                    <Td className="text-right font-semibold">{fmtCOP(report.totals.totalGrossRevenue)}</Td>
                    <Td className="text-right font-semibold">{fmtCOP(report.totals.totalCommission)}</Td>
                    <Td className="text-right font-semibold">-</Td>
                    <Td className="text-right font-semibold">{fmtCOP(report.totals.totalNetRevenue)}</Td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>

        {/* Footer stats */}
        {report && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <MiniStat
              label="Reserva promedio"
              value={fmtCOP(report.totals.totalGrossRevenue / report.totals.totalReservations)}
              icon={<IoReceipt className="h-4 w-4" />}
            />
            <MiniStat
              label="Comisión promedio"
              value={`${(report.reports.reduce((sum, motel) => sum + motel.commissionPercentage, 0) / report.reports.length).toFixed(1)}%`}
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
        <p className="text-sm md:text-lg font-semibold tracking-tight">{value}</p>
      </div>
      <div className="p-2 rounded-xl bg-slate-900 text-white">{icon}</div>
    </div>
  );
}