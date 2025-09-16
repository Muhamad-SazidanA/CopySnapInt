import React, { useState } from 'react';
import { Calendar, Clock, Monitor, Target, User } from 'lucide-react';
import { api } from '../utils/api';

export default function RequestDemoPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        linkedin: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const normalizeLinkedin = (input) => {
        if (!input) return '';
        let url = input.trim();
        if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(url)) url = `https://${url}`;
        try {
            const u = new URL(url);
            if (!/linkedin\.com$/i.test(u.hostname) && !/linkedin\.com$/i.test(u.hostname.replace(/^www\./i, ''))) {
                return url;
            }
            const hostname = u.hostname.toLowerCase();
            return `https://${hostname}${u.pathname}${u.search}${u.hash}`;
        } catch {
            return url;
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Name wajib diisi';
        else if (form.name.trim().length < 2) newErrors.name = 'Nama minimal 2 karakter';

        if (!form.email.trim()) newErrors.email = 'Email wajib diisi';
        else if (/@gmail\.com\s*$/i.test(form.email)) newErrors.email = 'Gunakan email perusahaan, bukan Gmail';
        else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(form.email)) newErrors.email = 'Format email tidak valid';

        if (!form.company.trim()) newErrors.company = 'Company wajib diisi';
        else if (form.company.trim().length < 2) newErrors.company = 'Nama perusahaan minimal 2 karakter';

        if (!form.phone.trim()) newErrors.phone = 'Phone wajib diisi';
        else {
            const phoneOnly = form.phone.replace(/[^0-9]/g, '');
            if (phoneOnly.length < 10 || phoneOnly.length > 20) newErrors.phone = 'Nomor telepon harus antara 10-20 digit';
        }

        if (form.linkedin.trim()) {
            try {
                const norm = normalizeLinkedin(form.linkedin);
                new URL(norm);
                if (!/^https:\/\/(?:www\.)?linkedin\.com\//i.test(norm)) {
                    newErrors.linkedin = 'Isi dengan tautan LinkedIn yang benar. Contoh: https://www.linkedin.com/in/username';
                }
            } catch {
                newErrors.linkedin = 'Isi dengan tautan LinkedIn yang benar. Contoh: https://www.linkedin.com/in/username';
            }
        }

        if (!form.message.trim()) newErrors.message = 'Pesan wajib diisi';
        else if (form.message.trim().length < 10) newErrors.message = 'Pesan minimal 10 karakter';

        return newErrors;
    };

    const mapServerErrors = (errorsArray) => {
        const map = { companyName: 'company', phoneNumber: 'phone', linkedin: 'linkedin', linkedinUrl: 'linkedin' };
        const out = {};
        errorsArray.forEach(err => {
            const serverField = err.field || err.context?.key || '';
            const clientField = map[serverField] || serverField;
            out[clientField] = err.message || err;
        });
        return out;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length) return;
        setLoading(true);
        try {
            const payload = {
                name: form.name.trim(),
                email: form.email.trim(),
                companyName: form.company.trim(),
                phoneNumber: form.phone.trim(),
                linkedinUrl: form.linkedin.trim() ? normalizeLinkedin(form.linkedin) : undefined,
                message: form.message.trim(),
            };
            const response = await api.post('/send-demo', payload);
            if (response.data?.success) {
                setForm({ name: '', email: '', company: '', phone: '', linkedin: '', message: '' });
                setErrors({});
                setErrorMsg('');
                setSuccess(true);
            } else if (response.data?.errors && Array.isArray(response.data.errors)) {
                setErrors(mapServerErrors(response.data.errors));
            } else {
                setErrorMsg(response.data?.message || 'Gagal mengirim permintaan demo.');
            }
        } catch (err) {
            const resp = err.response;
            if (resp?.status === 400 && Array.isArray(resp.data?.errors)) {
                setErrors(mapServerErrors(resp.data.errors));
            } else {
                setErrorMsg(resp?.data?.message || 'Terjadi kesalahan server. Pastikan backend berjalan.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 to-blue-50 py-20">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center space-x-3 mb-5">
                        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Calendar className="w-8 h-8 text-primary-700" />
                        </div>
                        <h1 className="text-4xl font-bold">Jadwalkan Demo Personal</h1>
                    </div>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        Lihat bagaimana snapint mentransformasi workflow pemrosesan dokumen Anda. Demo personal bersama solution architect kami.
                    </p>
                </div>

                {/* Demo Features (manual, no loop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary-700 mx-auto mb-4">
                            <Monitor className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold mb-1">Live Demo</h3>
                        <p className="text-sm text-slate-600">Interactive demo dengan document samples nyata</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary-700 mx-auto mb-4">
                            <HeadsetIcon />
                        </div>
                        <h3 className="font-semibold mb-1">Q&A Session</h3>
                        <p className="text-sm text-slate-600">Diskusi mendalam dengan solution architect</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary-700 mx-auto mb-4">
                            <Target className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold mb-1">Custom Use Case</h3>
                        <p className="text-sm text-slate-600">Demo disesuaikan dengan kebutuhan Anda</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary-700 mx-auto mb-4">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold mb-1">No Commitment</h3>
                        <p className="text-sm text-slate-600">Gratis tanpa kewajiban apapun</p>
                    </div>
                </div>

                {/* Main Form */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                        <div className="text-center p-8 pb-6">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary-800 text-sm font-medium mb-3">
                                <Monitor className="w-4 h-4 mr-1" /> Live Demo Session
                            </div>
                            <h2 className="text-2xl font-semibold">Request Demo Personal</h2>
                            <p className="text-slate-600 mt-1">Isi form di bawah. Kami akan menghubungi Anda untuk menjadwalkan.</p>
                        </div>
                        {success && (
                            <div className="mx-8 mt-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800">
                                Permintaan demo berhasil dikirim. Kami akan menghubungi Anda segera.
                            </div>
                        )}
                        {errorMsg && !success && (
                            <div className="mx-8 mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
                                {errorMsg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="p-8 space-y-8">
                            {/* Informasi Kontak (simplified fields) */}
                            <section>
                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                    <User className="w-5 h-5 mr-2" /> Informasi Kontak
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-medium mb-1" htmlFor="name">Name<span className="text-red-600">*</span></label>
                                        <input id="name" name="name" className="w-full h-11 rounded-xl border px-3 focus:outline-none border-slate-300" placeholder="Nama lengkap" value={form.name} onChange={handleChange} />
                                        {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-medium mb-1" htmlFor="email">Company Email<span className="text-red-600">*</span></label>
                                        <input id="email" name="email" type="email" className="w-full h-11 rounded-xl border px-3 focus:outline-none border-slate-300" placeholder="nama@perusahaan.com" value={form.email} onChange={handleChange} />
                                        {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-medium mb-1" htmlFor="company">Company Name<span className="text-red-600">*</span></label>
                                        <input id="company" name="company" className="w-full h-11 rounded-xl border px-3 focus:outline-none border-slate-300" placeholder="PT. Contoh Teknologi" value={form.company} onChange={handleChange} />
                                        {errors.company && <div className="text-red-500 text-xs mt-1">{errors.company}</div>}
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone Number<span className="text-red-600">*</span></label>
                                        <input id="phone" name="phone" type="tel" className="w-full h-11 rounded-xl border px-3 focus:outline-none border-slate-300" placeholder="+62 812 3456 7890" value={form.phone} onChange={handleChange} />
                                        {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-1" htmlFor="linkedin">LinkedIn URL (Optional)</label>
                                        <input id="linkedin" name="linkedin" type="text" className="w-full h-11 rounded-xl border px-3 focus:outline-none border-slate-300" placeholder="https://www.linkedin.com/in/username" value={form.linkedin} onChange={handleChange} />
                                        {errors.linkedin && <div className="text-red-500 text-xs mt-1">{errors.linkedin}</div>}
                                    </div>
                                </div>
                            </section>

                            {/* Message */}
                            <section>
                                <label className="block text-sm font-medium mb-1" htmlFor="message">Message<span className="text-red-600">*</span></label>
                                <textarea id="message" name="message" rows="4" className="w-full rounded-xl border px-3 py-2 focus:outline-none border-slate-300" placeholder="Ceritakan kebutuhan demo Anda..." value={form.message} onChange={handleChange} />
                                {errors.message && <div className="text-red-500 text-xs mt-1">{errors.message}</div>}
                            </section>

                            {/* Submit */}
                            <section className="pt-8">
                                <div className="text-center space-y-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`inline-flex items-center justify-center px-8 h-12 rounded-2xl text-white text-base font-medium shadow-sm hover:shadow-md transition-all duration-200 ${loading ? 'bg-primary-800 opacity-60 cursor-not-allowed' : 'bg-primary-800 hover:bg-primary-900'}`}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                                                Mengirim...
                                            </>
                                        ) : (
                                            <>Submit Message</>
                                        )}
                                    </button>
                                    <p className="text-xs pt-4 text-gray-500 max-w-md mx-auto">Tim kami akan menghubungi Anda dalam 24 jam untuk konfirmasi jadwal demo.</p>
                                </div>
                            </section>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Minimal headset icon built with SVG to avoid extra dependencies and keep manual JSX
function HeadsetIcon({ className = 'w-6 h-6' }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <path d="M4 12a8 8 0 0 1 16 0" />
            <path d="M18 19a3 3 0 0 1-3 3h-2" />
            <rect x="2" y="11" width="4" height="8" rx="2" />
            <rect x="18" y="11" width="4" height="8" rx="2" />
        </svg>
    );
}
