import React from 'react';

export default function InlinePopup({ success, setSuccess, errorMsg, setErrorMsg, successMessage }) {
    const show = !!success || !!errorMsg;
    if (!show) return null;

    const isSuccess = !!success;
    const msg = isSuccess ? (successMessage || 'Berhasil') : (errorMsg || 'Terjadi kesalahan');

    return (
        <div className="fixed bottom-6 right-6 z-[60]">
            <div
                className={`min-w-[260px] max-w-sm shadow-lg rounded-xl border px-4 py-3 text-sm flex items-start gap-3 ${isSuccess
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : 'bg-red-50 border-red-200 text-red-800'
                    }`}
                role="alert"
                aria-live="polite"
            >
                <div
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}
                    aria-hidden
                >
                    {isSuccess ? (
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 9v4m0 4h.01M12 3a9 9 0 110 18 9 9 0 010-18z" />
                        </svg>
                    )}
                </div>
                <div className="flex-1 leading-5">{msg}</div>
                <button
                    type="button"
                    className="ml-1 text-xs opacity-70 hover:opacity-100"
                    onClick={() => {
                        if (isSuccess) {
                            try { setSuccess && setSuccess(false); } catch { }
                        } else {
                            try { setErrorMsg && setErrorMsg(''); } catch { }
                        }
                    }}
                    aria-label="Tutup notifikasi"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
