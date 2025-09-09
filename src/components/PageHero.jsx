import React from 'react';

// Reusable Page Hero with chip + title + description
// Props:
// - icon: Lucide icon component
// - label: string for the chip
// - title: main heading
// - description: supporting paragraph
// - gradientFrom, gradientTo: Tailwind colors for background gradient
// - className: extra classes for the section
export default function PageHero({
    icon: Icon,
    label,
    title,
    description,
    gradientFrom = 'from-green-50',
    gradientTo = 'to-blue-100',
    className = '',
}) {
    return (
        <section className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} py-20 sm:py-24 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    {label && (
                        <div className="inline-flex items-center mb-6 px-4 py-2 text-sm bg-blue-50 text-gray-700 rounded-lg">
                            {Icon ? <Icon className="w-4 h-4 mr-2 text-[#133E68]" /> : null}
                            <span className="font-semibold">{label}</span>
                        </div>
                    )}
                    {title && (
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">{title}</h1>
                    )}
                    {description && (
                        <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{description}</p>
                    )}
                </div>
            </div>
        </section>
    );
}
