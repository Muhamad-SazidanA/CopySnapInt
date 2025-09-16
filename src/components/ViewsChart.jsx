import React from 'react';

// Lightweight responsive bar chart without external libs
// Props:
// - data: Array<{ date|week|month|year: string, views: number }>
// - viewPeriod: 'daily' | 'weekly' | 'monthly' | 'yearly'
// - color: bar color hex/rgb string
export function ViewsChart({ data = [], viewPeriod = 'daily', color = '#3B82F6' }) {
    const safeData = Array.isArray(data) ? data : [];
    const maxViews = Math.max(1, ...safeData.map(d => Number(d?.views) || 0));

    const labelKey =
        viewPeriod === 'daily' ? 'date' :
            viewPeriod === 'weekly' ? 'week' :
                viewPeriod === 'monthly' ? 'month' : 'year';

    const getLabel = (d) => {
        const raw = d?.[labelKey];
        if (!raw) return '';
        try {
            if (viewPeriod === 'daily') {
                // Expecting YYYY-MM-DD
                const [y, m, dd] = String(raw).split('-');
                return `${dd}/${m}`;
            }
            if (viewPeriod === 'monthly') {
                // Expecting YYYY-MM
                const [y, m] = String(raw).split('-');
                return `${m}/${String(y).slice(2)}`;
            }
            return String(raw);
        } catch {
            return String(raw);
        }
    };

    if (safeData.length === 0) {
        return (
            <div className="w-full h-48 flex items-center justify-center rounded-md bg-gray-50 border border-dashed border-gray-200 text-gray-400 text-sm">
                Tidak ada data
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="relative h-56 w-full border rounded-md bg-white">
                {/* Y grid lines */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="h-full flex flex-col justify-between p-2">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-full border-t border-gray-100" />
                        ))}
                    </div>
                </div>

                {/* Bars */}
                <div className="absolute inset-0 p-3 pb-8 flex items-end gap-1 overflow-x-auto">
                    {safeData.map((d, idx) => {
                        const v = Number(d?.views) || 0;
                        const h = (v / maxViews) * 100; // percent
                        return (
                            <div key={idx} className="flex flex-col items-center" style={{ minWidth: 20 }}>
                                <div
                                    title={`${getLabel(d)}: ${v.toLocaleString()} views`}
                                    className="w-4 rounded-sm transition-opacity hover:opacity-80"
                                    style={{ height: `${h}%`, backgroundColor: color }}
                                    aria-label={`${getLabel(d)} ${v} views`}
                                    role="img"
                                />
                            </div>
                        );
                    })}
                </div>

                {/* X labels */}
                <div className="absolute bottom-0 left-0 right-0 px-2 py-1">
                    <div className="flex gap-1 overflow-x-auto">
                        {safeData.map((d, idx) => (
                            <div
                                key={idx}
                                className="text-[10px] text-gray-500 text-center"
                                style={{ minWidth: 20 }}
                                aria-hidden
                            >
                                {getLabel(d)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SummaryStats({ data = [], title = '' }) {
    const safeData = Array.isArray(data) ? data : [];
    const total = safeData.reduce((acc, d) => acc + (Number(d?.views) || 0), 0);
    const count = safeData.length || 1;
    const avg = Math.round(total / count);
    const peak = safeData.reduce((max, d) => Math.max(max, Number(d?.views) || 0), 0);
    const peakItem = safeData.find(d => (Number(d?.views) || 0) === peak);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-blue-50 rounded-md p-3">
                <div className="text-xs text-gray-600">Total Views {title && `(${title})`}</div>
                <div className="text-xl font-semibold text-blue-700">{total.toLocaleString()}</div>
            </div>
            <div className="bg-emerald-50 rounded-md p-3">
                <div className="text-xs text-gray-600">Rata-rata per titik</div>
                <div className="text-xl font-semibold text-emerald-700">{avg.toLocaleString()}</div>
            </div>
            <div className="bg-indigo-50 rounded-md p-3">
                <div className="text-xs text-gray-600">Puncak</div>
                <div className="text-xl font-semibold text-indigo-700">{peak.toLocaleString()}</div>
                <div className="text-[11px] text-indigo-700/70 truncate">{peakItem ? (peakItem.date || peakItem.week || peakItem.month || peakItem.year) : '-'}</div>
            </div>
            <div className="bg-gray-50 rounded-md p-3">
                <div className="text-xs text-gray-600">Jumlah titik data</div>
                <div className="text-xl font-semibold text-gray-800">{safeData.length}</div>
            </div>
        </div>
    );
}

export default ViewsChart;

