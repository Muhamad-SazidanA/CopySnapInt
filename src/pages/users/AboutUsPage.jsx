import React from 'react';
import { Scan, ArrowRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// About Us redesigned to match provided reference and copy
export default function AboutUsPage() {
    const navigate = useNavigate();

    return (
        <div className="bg-white text-gray-900 font-inter">
            {/* Top: What we do (single-column, descriptions below heading) */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

                {/* Announcement Badge */}
                <div className='text-center'>
                    <div className="inline-flex items-center  mb-12 px-6 py-3 text-sm bg-blue-50 text-gray-700 rounded-lg">
                        <Info className="w-4 h-4 mr-2 font-bold" />
                        <span className="font-semibold">Tentang Snapint — Platform AI Otomasi Dokumen</span>
                    </div>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                    <span className="relative">
                        What we do
                        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-700 to-transparent rounded-full"></div>
                    </span>
                </h1>
                <div className="mt-8 space-y-6 text-slate-700 text-lg leading-relaxed">
                    <p>
                        Di Snapint, kami menyediakan platform IDP berbasis AI yang mengotomatiskan pengolahan dokumen dan alur ekstraksi data—membantu bisnis mempercepat operasional dan menghilangkan pekerjaan manual. Kami menggunakan teknologi OCR canggih dan deep learning untuk menangani berbagai dokumen: invoice, kuitansi, purchase order, kontrak, klaim, serta formulir—mengubahnya menjadi data terstruktur dan siap digunakan.
                    </p>
                    <h3 className="text-sm font-semibold tracking-widest uppercase text-primary-700">Dipercaya oleh Perusahaan Indonesia & Global</h3>
                    <p>
                        Snapint dirancang fleksibel untuk berbagai skala: dari usaha kecil, menengah, hingga enterprise. Solusi intuitif dan dapat dikustom membuat integrasi ke sistem yang sudah ada melalui API menjadi seamless—mengurangi beban kerja manual hingga 90%, serta meningkatkan akurasi, kecepatan, dan efisiensi biaya hingga 50%.
                    </p>
                </div>

            </section>

            {/* Vision banner (match site primary palette) */}
            <section className="pb-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-gradient-to-r from-primary-700 to-primary-800 text-white p-8 sm:p-12 shadow-lg">
                        <div className="uppercase tracking-widest text-xs font-semibold/none opacity-90 mb-3">Our Vision</div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
                            Mempercepat adopsi Machine Learning di Indonesia.
                        </h2>
                        <p className="mt-4 text-sm sm:text-base/relaxed opacity-90 max-w-3xl">
                            Kami percaya ML akan menjadi inti sistem bisnis masa depan—seefektif database hari ini. Fokus kami adalah membuat teknologi ini mudah diakses, aman, dan berdampak nyata untuk perusahaan di Indonesia.
                        </p>
                        <p className="mt-3 text-xs sm:text-sm/relaxed text-white/90">
                            Empowering Indonesia’s digital transformation with practical, secure, and scalable ML.
                        </p>
                    </div>
                </div>
            </section>

            {/* Reused CTA from Home */}
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
                                onClick={() => navigate('/demo')}
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

