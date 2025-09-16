import React from 'react';

export default function ConfirmModal({ open, title, message, onConfirm, onCancel, variant = 'info', icon, shape = 'circle' }) {
    if (!open) return null;

    const colors = {
        info: 'text-blue-700 bg-blue-50 border-blue-200',
        success: 'text-green-700 bg-green-50 border-green-200',
        warning: 'text-amber-800 bg-amber-50 border-amber-200',
        danger: 'text-red-700 bg-red-50 border-red-200',
    };

    const color = colors[variant] || colors.info;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-5 mx-4">
                <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 border ${color} ${shape === 'square' ? 'rounded-md' : 'rounded-full'} w-10 h-10 inline-flex items-center justify-center`}>
                        <span className="font-bold text-base leading-none">{icon || '!'}</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-base font-semibold mb-1">{title || 'Konfirmasi'}</h3>
                        <p className="text-sm text-gray-600">{message || 'Apakah Anda yakin?'}</p>
                    </div>
                </div>
                <div className="mt-5 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm rounded-lg border border-gray-300 bg-white hover:bg-gray-50"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm rounded-lg bg-[#0377FF] hover:bg-blue-600 text-white"
                    >
                        Lanjutkan
                    </button>
                </div>
            </div>
        </div>
    );
}
