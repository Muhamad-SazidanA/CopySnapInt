import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FileText,
    Tag,
    Calendar,
    Clock,
    ArrowRight,
    Scan,
} from 'lucide-react';


// CaseStudiesPage — JSX only, manual content (no loops)
export default function CaseStudiesPage() {
    const navigate = useNavigate();
    const handleDemoClick = () => {
        navigate('/demo');
    };
    return (
        <div className="bg-white text-gray-900">
            {/* Hero - Case Studies (inlined) */}
            <section className="bg-gradient-to-br from-green-50 to-blue-100 py-20 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center mb-12 px-6 py-3 text-sm bg-blue-50 text-gray-700 rounded-lg">
                            <FileText className="w-4 h-4 mr-2 text-[#133E68]" />
                            <span className="font-semibold">Case Studies</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Customer Success Stories
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            Lihat bagaimana perusahaan terkemuka mentransformasi workflow pemrosesan dokumen mereka dengan Snapint dan mencapai hasil yang terukur.
                        </p>
                    </div>
                </div>
            </section>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Case Studies grid (Blog-style cards) */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Mandiri */}
                    <article className="rounded-2xl border border-gray-100 hover:border-gray-200 transition shadow-sm overflow-hidden bg-white flex flex-col">
                        <div className="h-44 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-fuchsia-50 flex items-center justify-center">
                            <span className="text-blue-500 font-medium">Image Placeholder</span>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-center gap-3 text-xs text-gray-600">
                                <span className="inline-flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Banking</span>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Dec 2024</span>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />8 min</span>
                            </div>
                            <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">Bank Mandiri: Transformasi Digital Customer Onboarding</h3>
                            <p className="mt-2 text-sm text-gray-600 flex-1">Otomatisasi verifikasi dokumen KYC dan validasi data mempercepat onboarding nasabah dari hari ke jam.</p>
                            <a href="#" className="mt-4 inline-flex items-center text-sm font-semibold text-primary-700 hover:text-primary-800">
                                Baca studi kasus
                                <ArrowRight className="w-4 h-4 ml-1.5" />
                            </a>
                        </div>
                    </article>
                    {/* Prudential */}
                    <article className="rounded-2xl border border-gray-100 hover:border-gray-200 transition shadow-sm overflow-hidden bg-white flex flex-col">
                        <div className="h-44 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-fuchsia-50 flex items-center justify-center">
                            <span className="text-blue-500 font-medium">Image Placeholder</span>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-center gap-3 text-xs text-gray-600">
                                <span className="inline-flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Insurance</span>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Nov 2024</span>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />6 min</span>
                            </div>
                            <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">Prudential: Otomatisasi Claims Processing</h3>
                            <p className="mt-2 text-sm text-gray-600 flex-1">Ekstraksi data klaim dan validasi dokumen medis menurunkan waktu settlement secara signifikan.</p>
                            <a href="#" className="mt-4 inline-flex items-center text-sm font-semibold text-primary-700 hover:text-primary-800">
                                Baca studi kasus
                                <ArrowRight className="w-4 h-4 ml-1.5" />
                            </a>
                        </div>
                    </article>
                    {/* Unilever */}
                    <article className="rounded-2xl border border-gray-100 hover:border-gray-200 transition shadow-sm overflow-hidden bg-white flex flex-col">
                        <div className="h-44 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-fuchsia-50 flex items-center justify-center">
                            <span className="text-blue-500 font-medium">Image Placeholder</span>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-center gap-3 text-xs text-gray-600">
                                <span className="inline-flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Manufacturing</span>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Sep 2024</span>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />9 min</span>
                            </div>
                            <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">Unilever: Supply Chain Document Automation</h3>
                            <p className="mt-2 text-sm text-gray-600 flex-1">Otomatisasi PO, invoice, dan dokumen pengiriman meningkatkan visibilitas dan kepatuhan.</p>
                            <a href="#" className="mt-4 inline-flex items-center text-sm font-semibold text-primary-700 hover:text-primary-800">
                                Baca studi kasus
                                <ArrowRight className="w-4 h-4 ml-1.5" />
                            </a>
                        </div>
                    </article>
                    {/* JNE */}
                    <article className="rounded-2xl border border-gray-100 hover:border-gray-200 transition shadow-sm overflow-hidden bg-white flex flex-col">
                        <div className="h-44 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-fuchsia-50 flex items-center justify-center">
                            <span className="text-blue-500 font-medium">Image Placeholder</span>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-center gap-3 text-xs text-gray-600">
                                <span className="inline-flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Logistics</span>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Aug 2024</span>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />5 min</span>
                            </div>
                            <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">JNE: Logistics Document Processing Revolution</h3>
                            <p className="mt-2 text-sm text-gray-600 flex-1">Digitalisasi dokumen pengiriman dan validasi otomatis memangkas waktu operasional.</p>
                            <a href="#" className="mt-4 inline-flex items-center text-sm font-semibold text-primary-700 hover:text-primary-800">
                                Baca studi kasus
                                <ArrowRight className="w-4 h-4 ml-1.5" />
                            </a>
                        </div>
                    </article>
                    {/* Siloam */}
                    <article className="rounded-2xl border border-gray-100 hover:border-gray-200 transition shadow-sm overflow-hidden bg-white flex flex-col">
                        <div className="h-44 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-fuchsia-50 flex items-center justify-center">
                            <span className="text-blue-500 font-medium">Image Placeholder</span>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-center gap-3 text-xs text-gray-600">
                                <span className="inline-flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Healthcare</span>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Oct 2024</span>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />7 min</span>
                            </div>
                            <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">RS Siloam: Digitalisasi Medical Records</h3>
                            <p className="mt-2 text-sm text-gray-600 flex-1">Pengelolaan rekam medis lebih cepat dan akurat melalui ekstraksi data otomatis.</p>
                            <a href="#" className="mt-4 inline-flex items-center text-sm font-semibold text-primary-700 hover:text-primary-800">
                                Baca studi kasus
                                <ArrowRight className="w-4 h-4 ml-1.5" />
                            </a>
                        </div>
                    </article>
                    {/* Universitas Indonesia */}
                    <article className="rounded-2xl border border-gray-100 hover:border-gray-200 transition shadow-sm overflow-hidden bg-white flex flex-col">
                        <div className="h-44 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-fuchsia-50 flex items-center justify-center">
                            <span className="text-blue-500 font-medium">Image Placeholder</span>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-center gap-3 text-xs text-gray-600">
                                <span className="inline-flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Education</span>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Jul 2024</span>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />6 min</span>
                            </div>
                            <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">Universitas Indonesia: Academic Records Digitization</h3>
                            <p className="mt-2 text-sm text-gray-600 flex-1">Digitalisasi arsip akademik mempercepat validasi dokumen dan layanan mahasiswa.</p>
                            <a href="#" className="mt-4 inline-flex items-center text-sm font-semibold text-primary-700 hover:text-primary-800">
                                Baca studi kasus
                                <ArrowRight className="w-4 h-4 ml-1.5" />
                            </a>
                        </div>
                    </article>
                </div>
                {/* CTA Section */}
                <section className="py-12 sm:py-16">
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
        </div>
    );
}