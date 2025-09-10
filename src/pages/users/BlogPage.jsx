import React from 'react';
import { Scan, ArrowRight, Calendar, Clock, Tag } from 'lucide-react';

export default function BlogPage() {
    // contoh handler untuk tombol demo
    const handleDemoClick = () => {
        window.location.href = '/demo';
    };

    return (
        <div className="bg-white text-gray-900">
            {/* Hero - Blog & Insights (inlined) */}
            <section className="bg-gradient-to-br from-green-50 to-blue-100 py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center mb-6 px-4 py-2 text-sm bg-blue-50 text-gray-700 rounded-lg">
                            <Tag className="w-4 h-4 mr-2 text-[#133E68]" />
                            <span className="font-semibold">Blog & Insights</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Wawasan seputar AI, IDP, dan Otomasi Dokumen
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            Artikel, panduan, dan pembaruan produk untuk membantu tim Anda membangun otomasi dokumen yang andal, cepat, dan compliant.
                        </p>
                    </div>
                </div>
            </section>

            {/* Category filters removed as requested */}

            {/* Posts grid */}
            <section className="py-10 sm:py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* 1 */}
                        <article className="rounded-2xl border border-gray-100 hover:border-gray-200 transition shadow-sm overflow-hidden bg-white flex flex-col">
                            <div className="h-44 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-fuchsia-50 flex items-center justify-center">
                                <span className="text-blue-500 font-medium">Image Placeholder</span>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-center gap-3 text-xs text-gray-600">
                                    <span className="inline-flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Finance</span>
                                    <span>•</span>
                                    <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Sep 2025</span>
                                    <span>•</span>
                                    <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />6 min</span>
                                </div>
                                <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">Bagaimana AI mempercepat proses invoice</h3>
                                <p className="mt-2 text-sm text-gray-600 flex-1">Pendekatan praktis memanfaatkan OCR & model ekstraksi untuk memangkas waktu input hingga 80%.</p>
                                <a href="#" className="mt-4 inline-flex items-center text-sm font-semibold text-primary-700 hover:text-primary-800">
                                    Baca selengkapnya
                                    <ArrowRight className="w-4 h-4 ml-1.5" />
                                </a>
                            </div>
                        </article>

                        {/* 2 */}
                        <article className="rounded-2xl border border-gray-100 hover:border-gray-200 transition shadow-sm overflow-hidden bg-white flex flex-col">
                            <div className="h-44 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-fuchsia-50 flex items-center justify-center">
                                <span className="text-blue-500 font-medium">Image Placeholder</span>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-center gap-3 text-xs text-gray-600">
                                    <span className="inline-flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Guides</span>
                                    <span>•</span>
                                    <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Aug 2025</span>
                                    <span>•</span>
                                    <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />10 min</span>
                                </div>
                                <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">Panduan memulai IDP di perusahaan Anda</h3>
                                <p className="mt-2 text-sm text-gray-600 flex-1">Langkah bertahap memilih use case, menilai ROI, dan integrasi via API.</p>
                                <a href="#" className="mt-4 inline-flex items-center text-sm font-semibold text-primary-700 hover:text-primary-800">
                                    Baca selengkapnya
                                    <ArrowRight className="w-4 h-4 ml-1.5" />
                                </a>
                            </div>
                        </article>

                        {/* 3 */}
                        <article className="rounded-2xl border border-gray-100 hover:border-gray-200 transition shadow-sm overflow-hidden bg-white flex flex-col">
                            <div className="h-44 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-fuchsia-50 flex items-center justify-center">
                                <span className="text-blue-500 font-medium">Image Placeholder</span>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-center gap-3 text-xs text-gray-600">
                                    <span className="inline-flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Operations</span>
                                    <span>•</span>
                                    <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Aug 2025</span>
                                    <span>•</span>
                                    <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />7 min</span>
                                </div>
                                <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">Metrik penting untuk tim operasi dokumen</h3>
                                <p className="mt-2 text-sm text-gray-600 flex-1">Dari SLA hingga akurasi model—metrik yang benar akan mengarahkan perbaikan yang tepat.</p>
                                <a href="#" className="mt-4 inline-flex items-center text-sm font-semibold text-primary-700 hover:text-primary-800">
                                    Baca selengkapnya
                                    <ArrowRight className="w-4 h-4 ml-1.5" />
                                </a>
                            </div>
                        </article>

                        {/* 4 */}
                        <article className="rounded-2xl border border-gray-100 hover:border-gray-200 transition shadow-sm overflow-hidden bg-white flex flex-col">
                            <div className="h-44 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-fuchsia-50 flex items-center justify-center">
                                <span className="text-blue-500 font-medium">Image Placeholder</span>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-center gap-3 text-xs text-gray-600">
                                    <span className="inline-flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Finance</span>
                                    <span>•</span>
                                    <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Jul 2025</span>
                                    <span>•</span>
                                    <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />8 min</span>
                                </div>
                                <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">Automasi KYC: akurasi vs. pengalaman pengguna</h3>
                                <p className="mt-2 text-sm text-gray-600 flex-1">Menyeimbangkan verifikasi yang kuat dengan proses onboarding yang mulus.</p>
                                <a href="#" className="mt-4 inline-flex items-center text-sm font-semibold text-primary-700 hover:text-primary-800">
                                    Baca selengkapnya
                                    <ArrowRight className="w-4 h-4 ml-1.5" />
                                </a>
                            </div>
                        </article>

                        {/* 5 */}
                        <article className="rounded-2xl border border-gray-100 hover:border-gray-200 transition shadow-sm overflow-hidden bg-white flex flex-col">
                            <div className="h-44 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-fuchsia-50 flex items-center justify-center">
                                <span className="text-blue-500 font-medium">Image Placeholder</span>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-center gap-3 text-xs text-gray-600">
                                    <span className="inline-flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Product Updates</span>
                                    <span>•</span>
                                    <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Jul 2025</span>
                                    <span>•</span>
                                    <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />3 min</span>
                                </div>
                                <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">Product update: model tabel lebih akurat</h3>
                                <p className="mt-2 text-sm text-gray-600 flex-1">Peningkatan ekstraksi tabel kompleks pada invoice dan PO.</p>
                                <a href="#" className="mt-4 inline-flex items-center text-sm font-semibold text-primary-700 hover:text-primary-800">
                                    Baca selengkapnya
                                    <ArrowRight className="w-4 h-4 ml-1.5" />
                                </a>
                            </div>
                        </article>

                        {/* 6 */}
                        <article className="rounded-2xl border border-gray-100 hover:border-gray-200 transition shadow-sm overflow-hidden bg-white flex flex-col">
                            <div className="h-44 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-fuchsia-50 flex items-center justify-center">
                                <span className="text-blue-500 font-medium">Image Placeholder</span>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-center gap-3 text-xs text-gray-600">
                                    <span className="inline-flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Finance</span>
                                    <span>•</span>
                                    <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Jun 2025</span>
                                    <span>•</span>
                                    <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />5 min</span>
                                </div>
                                <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">Studi kasus: efisiensi 50% di AR process</h3>
                                <p className="mt-2 text-sm text-gray-600 flex-1">Bagaimana tim AR menurunkan aging dan mempercepat cash flow dengan IDP.</p>
                                <a href="#" className="mt-4 inline-flex items-center text-sm font-semibold text-primary-700 hover:text-primary-800">
                                    Baca selengkapnya
                                    <ArrowRight className="w-4 h-4 ml-1.5" />
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* CTA Section (kept) */}
            <section className="pb-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center bg-gradient-to-r from-primary-50 to-primary-100 rounded-3xl p-10 sm:p-16 min-h-[20rem] flex flex-col items-center justify-center">
                        <Scan className="w-16 h-16 text-primary-800 mx-auto mb-6" />
                        <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-gray-900">
                            Siap Mulai Transformasi Digital?
                        </h3>
                        <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto">
                            Bergabunglah dengan ribuan perusahaan yang telah mempercayakan pemrosesan dokumen mereka kepada platform AI kami
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center">
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