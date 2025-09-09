import React from 'react';
import { Users, ArrowRight, Scan } from 'lucide-react';

export default function Logistic() {
    const handleDemoClick = () => {
        window.location.href = '/demo';
    };
    return (
        <div className="bg-white text-gray-900">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-green-50 to-blue-100 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center mb-6 px-4 py-2 text-sm bg-blue-50 text-gray-700 rounded-lg">
                            <Users className="w-4 h-4 mr-2 text-[#133E68]" />
                            <span className="font-semibold">Logistic Solutions</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">Optimasi dan Automasi Logistik</h1>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                            Tingkatkan akurasi dokumen, tracking pengiriman, dan rekonsiliasi biaya logistik dengan AI.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button
                                type="button"
                                onClick={handleDemoClick}
                                className="px-10 py-3 text-lg bg-primary-800 hover:bg-primary-900 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center shadow-lg"
                            >
                                Jadwalkan Demo
                                <ArrowRight className="w-6 h-6 ml-3" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Title above sections */}
            <section className="py-12 font-inter">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-indigo-900/80 mb-3">
                        WHAT OTHERS ARE AUTOMATING
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Intelligent AI that’s tailor-made for logistics workflows
                    </h2>
                </div>
            </section>

            {/* Inline sections */}
            <div className="font-inter">
                {/* 1. Shipment document automation */}
                <section className="py-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-center">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">Shipment document automation</h2>
                                <ul className="space-y-2 text-gray-700 text-[15px] sm:text-base leading-relaxed">
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Ekstrak data dari B/L, AWB, invoice, dan packing list otomatis.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Validasi data dengan PO dan sistem WMS/ERP.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Kurangi input manual dan kesalahan dokumen.</span></li>
                                </ul>
                                <a href="#" className="mt-6 inline-flex items-center font-semibold text-primary-700 hover:text-primary-800 text-sm sm:text-base">
                                    Read case study
                                    <ArrowRight className="w-4 h-4 ml-1.5" />
                                </a>
                            </div>
                            <div>
                                <div className="w-full h-48 sm:h-56 md:h-64 rounded-xl border bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100 flex items-center justify-center shadow-sm">
                                    <span className="text-blue-500/80 font-medium text-sm sm:text-base">Image Placeholder</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Freight cost reconciliation (image left) */}
                <section className="py-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-center">
                            <div className="md:order-1">
                                <div className="w-full h-48 sm:h-56 md:h-64 rounded-xl border bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100 flex items-center justify-center shadow-sm">
                                    <span className="text-blue-500/80 font-medium text-sm sm:text-base">Image Placeholder</span>
                                </div>
                            </div>
                            <div className="md:order-2">
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">Freight cost reconciliation</h2>
                                <ul className="space-y-2 text-gray-700 text-[15px] sm:text-base leading-relaxed">
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Bandingkan tarif carrier vs invoice secara otomatis.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Deteksi biaya tidak wajar dan klaim koreksi.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Percepat closing biaya logistik.</span></li>
                                </ul>
                                <a href="#" className="mt-6 inline-flex items-center font-semibold text-primary-700 hover:text-primary-800 text-sm sm:text-base">
                                    Learn more
                                    <ArrowRight className="w-4 h-4 ml-1.5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Returns & claims processing */}
                <section className="py-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-center">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">Returns & claims processing</h2>
                                <ul className="space-y-2 text-gray-700 text-[15px] sm:text-base leading-relaxed">
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Otomatisasi formulir retur, foto bukti, dan pencocokan order.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Routing approval cepat dengan status transparan.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Integrasi WMS/OMS untuk update stok.</span></li>
                                </ul>
                                <a href="#" className="mt-6 inline-flex items-center font-semibold text-primary-700 hover:text-primary-800 text-sm sm:text-base">
                                    Improve your process
                                    <ArrowRight className="w-4 h-4 ml-1.5" />
                                </a>
                            </div>
                            <div>
                                <div className="w-full h-48 sm:h-56 md:h-64 rounded-xl border bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100 flex items-center justify-center shadow-sm">
                                    <span className="text-blue-500/80 font-medium text-sm sm:text-base">Image Placeholder</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Vehicle/route documents (image left) */}
                <section className="py-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-center">
                            <div className="md:order-1">
                                <div className="w-full h-48 sm:h-56 md:h-64 rounded-xl border bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100 flex items-center justify-center shadow-sm">
                                    <span className="text-blue-500/80 font-medium text-sm sm:text-base">Image Placeholder</span>
                                </div>
                            </div>
                            <div className="md:order-2">
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">Vehicle & route documents</h2>
                                <ul className="space-y-2 text-gray-700 text-[15px] sm:text-base leading-relaxed">
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Otomatisasi STNK, SIM, surat jalan, dan dokumen rute.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Peringatan kedaluwarsa dokumen dan compliance.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Sinkron ke sistem armada Anda.</span></li>
                                </ul>
                                <a href="#" className="mt-6 inline-flex items-center font-semibold text-primary-700 hover:text-primary-800 text-sm sm:text-base">
                                    Keep documents current
                                    <ArrowRight className="w-4 h-4 ml-1.5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Logistics analytics & reporting */}
                <section className="py-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-center">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">Logistics analytics & reporting</h2>
                                <ul className="space-y-2 text-gray-700 text-[15px] sm:text-base leading-relaxed">
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Insight biaya per rute, lead time, dan performa carrier.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Deteksi bottleneck operasi dan rekomendasi perbaikan.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Laporan compliance dan SLA pengiriman.</span></li>
                                </ul>
                                <a href="#" className="mt-6 inline-flex items-center font-semibold text-primary-700 hover:text-primary-800 text-sm sm:text-base">
                                    See dashboards
                                    <ArrowRight className="w-4 h-4 ml-1.5" />
                                </a>
                            </div>
                            <div>
                                <div className="w-full h-48 sm:h-56 md:h-64 rounded-xl border bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100 flex items-center justify-center shadow-sm">
                                    <span className="text-blue-500/80 font-medium text-sm sm:text-base">Image Placeholder</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* CTA Section */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 font-inter">
                    <div className="mt-4 text-center bg-gradient-to-r from-primary-50 to-primary-100 rounded-3xl p-10 sm:p-12 md:p-16">
                        <Scan className="w-12 h-12 sm:w-16 sm:h-16 text-primary-800 mx-auto mb-6" />
                        <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-gray-900">Siap Mulai Transformasi Digital?</h3>
                        <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto">
                            Bergabunglah dengan ribuan perusahaan yang telah mempercayakan pemrosesan dokumen mereka kepada platform AI kami
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button
                                className="px-10 py-3 text-lg bg-primary-800 hover:bg-primary-900 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center shadow-lg"
                                onClick={handleDemoClick}
                            >
                                Jadwalkan Demo
                                <ArrowRight className="w-6 h-6 ml-3" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}