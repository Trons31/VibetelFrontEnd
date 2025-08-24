'use client';

import { formatDate } from '@/utils';
import { Document, Page, Text, View, StyleSheet, Image, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';



const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        borderBottomStyle: 'dashed',
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#cc0000',
    },
    headerText: {
        fontSize: 12,
        color: '#333',
    },
    section: {
        marginBottom: 30,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 5,
        color: '#cc0000',
        marginTop: 5
    },
    infoBox: {
        border: '1px solid #ddd',
        borderRadius: 5,
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#f7f7f7',
    },
    infoText: {
        fontSize: 16,
        marginBottom: 5,
    },
    comparison: {
        fontSize: 9,
        color: '#666',
    },
    footer: {
        borderTopWidth: 2,
        borderTopColor: '#cc0000',
        paddingTop: 10,
        textAlign: 'center',
        marginTop: 30,
        fontSize: 12,
        color: '#666',
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '30%',
        border: '1px solid #ddd',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#f7f7f7',
    },
});

interface PropsPDF {
    nameMotel: string;
}

const PDFReport = ({ nameMotel }: PropsPDF) => (
    <Document>
        <Page style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>{nameMotel}</Text>
                    <Text style={styles.headerText}>Dirección del Motel</Text>
                    <Text style={styles.headerText}>Contacto: +123 456 789</Text>
                </View>
                <View>
                    <Text style={styles.headerText}>Reporte Diario</Text>
                    <Text style={styles.headerText}>{formatDate(new Date())}</Text>
                </View>
            </View>

            {/* Body */}
            <View style={styles.section}>
                {/* Ingresos */}
                <Text style={styles.sectionHeader}>Ingresos</Text>
                <View style={styles.infoBox}>
                    <View style={styles.grid}>
                        <View  >
                            <Text style={styles.infoText}>$15,000</Text>
                            <Text style={styles.comparison}>(5% desde ayer)</Text>
                        </View>
                        <View  >
                            <Text style={styles.infoText}>$14,250</Text>
                            <Text style={styles.comparison}>(4% desde ayer)</Text>
                        </View>
                    </View>
                </View>

                {/* Reservas */}
                <Text style={styles.sectionHeader}>Reservas</Text>
                <View style={styles.grid}>
                    <View style={styles.gridItem}>
                        <Text style={styles.infoText}>Total</Text>
                        <Text style={styles.infoText}>120</Text>
                        <Text style={styles.comparison}>(10% desde ayer)</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.infoText}>Completadas</Text>
                        <Text style={styles.infoText}>100</Text>
                        <Text style={styles.comparison}>(8% desde ayer)</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.infoText}>Canceladas</Text>
                        <Text style={styles.infoText}>20</Text>
                        <Text style={styles.comparison}>(12% desde ayer)</Text>
                    </View>
                </View>

                {/* Horas Picos */}

                <Text style={styles.sectionHeader}>Horas Picos del Día</Text>
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>12:00 PM - 1:00 PM</Text>
                    <Text style={styles.infoText}>6:00 PM - 7:00 PM</Text>
                </View>


                {/* Habitaciones Más Reservadas */}
                <Text style={styles.sectionHeader}>Habitaciones Más Reservadas</Text>
                <View style={styles.grid}>
                    <View style={styles.gridItem}>
                        <Text style={styles.infoText}>Suite Deluxe</Text>
                        <Text style={styles.infoText}>30</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.infoText}>Habitación Doble</Text>
                        <Text style={styles.infoText}>25</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.infoText}>Habitación Sencilla</Text>
                        <Text style={styles.infoText}>20</Text>
                    </View>
                </View>

                {/* Total Descuentos */}
                <Text style={styles.sectionHeader}>Total Descuentos Generados</Text>
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>$2,000</Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text>Generado por MoteleroOnline</Text>
            </View>
        </Page>
    </Document>
);

interface Props {

}

export const Report = () => {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // Render nothing on the server
    }

    return (
        <div>
            <div className='p-10 mt-10 bg-white rounded-md shadow-md'>
                <p className='text-2xl font-bold'>Reporte de hoy</p>
                <p className='mt-2 mb-2 text-gray-700 text-sm'>
                    Este reporte ofrece una visión detallada de las actividades de reserva en nuestro motel para el día de hoy. Incluye un resumen de las reservas realizadas, indicando la cantidad total, las completadas con éxito, las canceladas y las pendientes. Además, presenta un desglose de los ingresos generados y gráficos que destacan las horas pico, las habitaciones más reservadas y otros datos relevantes. Este informe proporciona a los administradores una herramienta valiosa para el análisis y la toma de decisiones
                </p>
                <BlobProvider document={<PDFReport nameMotel="Carpe Diem" />}>
                    {({ blob, url, loading, error }) => {
                        if (loading) {
                            return (
                                <button className="flex items-center gap-x-4 rounded-xl bg-blue-600 px-8 py-3 font-medium text-white">
                                    Generando PDF...
                                </button>
                            );
                        }
                        return (
                            <a
                                href={url || undefined}
                                download="report.pdf"
                                className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md text-white"
                            >
                                Descargar PDF
                            </a>
                        );
                    }}
                </BlobProvider>
            </div>
            <div className="p-10 mt-24 bg-white rounded-md shadow-md">
                <div className="p-8 font-sans">
                    {/* Header */}
                    <header className="mb-8">
                        <div className="flex justify-between items-center border-b-2 pb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-red-600">Carpe Diem</h1>
                                <p className="text-sm text-gray-600">Cll 11a 10-21</p>
                                <p className="text-sm text-gray-600">Contacto: +123 456 789</p>
                            </div>
                            <div className="text-right">
                                <h2 className="text-xl font-bold">Reporte Diario</h2>
                                <p className="text-sm text-gray-600">Fecha: 23/07/2024</p>
                            </div>
                        </div>
                    </header>

                    {/* Body */}
                    <div>
                        {/* Ingresos */}
                        <section className="mb-8">
                            <h2 className="text-md text-gray-700 font-bold uppercase mb-2">Ingresos</h2>
                            <div className="flex justify-between items-center bg-gray-100 p-4 rounded">
                                <div className="flex items-center">
                                    <span className="text-3xl font-bold text-green-600">$15,000</span>
                                    <span className="ml-4 text-sm text-gray-600">(↑ 5% desde ayer)</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-3xl font-bold text-red-600">$14,250</span>
                                    <span className="ml-4 text-sm text-gray-600">(↑ 4% desde ayer)</span>
                                </div>
                            </div>
                        </section>

                        {/* Reservas */}
                        <section className="mb-8">
                            <h2 className="text-md text-gray-700 font-bold uppercase mb-2">Reservas</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-gray-100 p-4 rounded">
                                    <h3 className="text-xl font-bold">Total</h3>
                                    <p className="text-3xl font-bold">120</p>
                                    <p className="text-sm text-gray-600">(↑ 10% desde ayer)</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded">
                                    <h3 className="text-xl font-bold">Completadas</h3>
                                    <p className="text-3xl font-bold">100</p>
                                    <p className="text-sm text-gray-600">(↑ 8% desde ayer)</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded">
                                    <h3 className="text-xl font-bold">Canceladas</h3>
                                    <p className="text-3xl font-bold">20</p>
                                    <p className="text-sm text-gray-600">(↑ 12% desde ayer)</p>
                                </div>
                            </div>
                        </section>

                        {/* Horas Picos */}
                        <section className="mb-8">
                            <h2 className="text-md text-gray-700 font-bold uppercase mb-2">Horas Picos del Día</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-100 p-4 rounded">
                                    <h3 className="text-xl font-bold">2:00 pm - 4:00 pm</h3>
                                    <p className="text-sm text-gray-600">(20 reservas)</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded">
                                    <h3 className="text-xl font-bold">2:00 pm - 4:00 pm</h3>
                                    <p className="text-sm text-gray-600">(20 reservas)</p>
                                </div>
                            </div>
                        </section>

                        {/* Habitaciones Más Reservadas */}
                        <section className="mb-8">
                            <h2 className="text-md text-gray-700 font-bold uppercase mb-2">Habitaciones Más Reservadas</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-gray-100 p-4 rounded">
                                    <h3 className="text-xl font-bold">Suite Deluxe</h3>
                                    <p className="text-3xl font-bold">30</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded">
                                    <h3 className="text-xl font-bold">Habitación Doble</h3>
                                    <p className="text-3xl font-bold">25</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded">
                                    <h3 className="text-xl font-bold">Habitación Sencilla</h3>
                                    <p className="text-3xl font-bold">20</p>
                                </div>
                            </div>
                        </section>

                        {/* Total Descuentos */}
                        <section className="mb-8">
                            <h2 className="text-md text-gray-700 font-bold uppercase mb-2">Total Descuentos Generados</h2>
                            <div className="bg-gray-100 p-4 rounded">
                                <p className="text-3xl font-bold text-green-600">$2,000</p>
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <footer className="mt-8 border-t-2 pt-4 text-center">
                        <p className="text-sm text-gray-600">Generado por MoteleroOnline</p>
                    </footer>
                </div>
            </div>


        </div>
    );
};
