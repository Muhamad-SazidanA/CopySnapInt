import React from 'react';
import { Users, ArrowRight, Scan } from 'lucide-react';


// Full Finance (Finance) page with all sections, only ROI Calculator buttons removed
export default function Finance() {
    const handleDemoClick = () => {
        window.location.href = '/demo';
    };

    return (
        <div className="bg-white text-gray-900">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-green-50 to-blue-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center mb-12 px-6 py-3 text-sm bg-blue-50 text-gray-700 rounded-lg">
                            <Users className="w-4 h-4 mr-2 text-[#133E68]" />
                            <span className="font-semibold">Finance Solutions</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Finance yang Instant & Compliant
                        </h1>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                            Transformasi complete Finance experience dengan AI-powered document processing.
                            Dari KYC verification hingga income assessment, semua automated dengan akurasi tinggi dan
                            compliance yang terjamin.
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
                            {/* ROI Calculator button removed */}
                        </div>
                    </div>
                </div>
            </section>
            {/* Title above finance workflow sections */}
            <section className="py-12 font-inter">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-indigo-900/80 mb-3">
                        WHAT OTHERS ARE AUTOMATING
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Intelligent AI that’s tailor-made for finance workflows
                    </h2>
                </div>
            </section>
            {/* Inline sections */}
            <div className="font-inter">
                {/* 1. Accounts payable automation (text left, image right) */}
                <section className="py-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-center">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">Accounts payable automation</h2>
                                <ul className="space-y-2 text-gray-700 text-[15px] sm:text-base leading-relaxed">
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Automatically extract data from invoices, receipts, and purchase orders.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Implement 2-way and 3-way matching to prevent discrepancies.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Streamline approval workflows within your existing communication tools.</span></li>
                                </ul>
                                <a href="#" className="mt-6 inline-flex items-center font-semibold text-primary-700 hover:text-primary-800 text-sm sm:text-base">
                                    Read case study for Ascend Properties
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
                {/* 2. Financial Reconciliation (image left, text right) */}
                <section className="py-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-center">
                            <div className="md:order-1">
                                <div className="w-full h-48 sm:h-56 md:h-64 rounded-xl border bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100 flex items-center justify-center shadow-sm">
                                    <span className="text-blue-500/80 font-medium text-sm sm:text-base">Image Placeholder</span>
                                </div>
                            </div>
                            <div className="md:order-2">
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">Financial Reconciliation</h2>
                                <ul className="space-y-2 text-gray-700 text-[15px] sm:text-base leading-relaxed">
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Match transactions across bank statements, ledgers, and invoices effortlessly.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Identify and resolve discrepancies with AI-driven suggestions.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Accelerate month-end and year-end closing processes.</span></li>
                                </ul>
                                <a href="#" className="mt-6 inline-flex items-center font-semibold text-primary-700 hover:text-primary-800 text-sm sm:text-base">
                                    Read case study for In2 Project Management
                                    <ArrowRight className="w-4 h-4 ml-1.5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                {/* 3. Accounts Receivable Management (text left, image right) */}
                <section className="py-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-center">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">Accounts Receivable Management</h2>
                                <ul className="space-y-2 text-gray-700 text-[15px] sm:text-base leading-relaxed">
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Automate the generation and dispatch of customer invoices.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Track payments and send automated reminders to clients.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Integrate with your CRM to maintain up-to-date customer records.</span></li>
                                </ul>
                                <a href="#" className="mt-6 inline-flex items-center font-semibold text-primary-700 hover:text-primary-800 text-sm sm:text-base">
                                    Automate your workflow
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
                {/* 4. Expense Management (image left, text right) */}
                <section className="py-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-center">
                            <div className="md:order-1">
                                <div className="w-full h-48 sm:h-56 md:h-64 rounded-xl border bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100 flex items-center justify-center shadow-sm">
                                    <span className="text-blue-500/80 font-medium text-sm sm:text-base">Image Placeholder</span>
                                </div>
                            </div>
                            <div className="md:order-2">
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">Expense Management</h2>
                                <ul className="space-y-2 text-gray-700 text-[15px] sm:text-base leading-relaxed">
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Automate the capture and categorization of employee expenses.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Integrate with corporate credit card systems for real-time tracking.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Simplify reimbursement processes with automated approvals.</span></li>
                                </ul>
                                <a href="#" className="mt-6 inline-flex items-center font-semibold text-primary-700 hover:text-primary-800 text-sm sm:text-base">
                                    Automate your workflow
                                    <ArrowRight className="w-4 h-4 ml-1.5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                {/* 5. Financial Reporting & Analysis (text left, image right) */}
                <section className="py-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-center">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">Financial Reporting & Analysis</h2>
                                <ul className="space-y-2 text-gray-700 text-[15px] sm:text-base leading-relaxed">
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Generate real-time financial reports with data pulled directly from your systems.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Customize dashboards to monitor key performance indicators.</span></li>
                                    <li className="flex items-start"><span className="mt-2 mr-3 h-1 w-1 rounded-full bg-gray-900" /><span>Ensure compliance with regulatory standards through accurate reporting.</span></li>
                                </ul>
                                <a href="#" className="mt-6 inline-flex items-center font-semibold text-primary-700 hover:text-primary-800 text-sm sm:text-base">
                                    Automate your workflow
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
                    <div className="mt-4 text-center bg-gradient-to-r from-primary-50 to-primary-100 rounded-3xl p-10 sm:p-16 min-h-[20rem] flex flex-col items-center justify-center">
                        <Scan className="w-16 h-16 text-primary-800 mx-auto mb-6" />
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
