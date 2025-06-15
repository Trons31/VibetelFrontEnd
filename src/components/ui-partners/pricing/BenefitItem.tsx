import React from 'react';

interface Props {
    text: string;
    tooltipText?: string;
}

export const BenefitItem = ({ text, tooltipText }: Props) => {
    return (
        <div className="relative group flex items-start">
            <span className="ml-3 text-xs text-gray-700 cursor-pointer underline decoration-dotted">
                {text}
            </span>
            {tooltipText && (
                <div className="absolute z-10 left-6 top-full mt-2 w-64 p-2 rounded-lg text-xs text-white bg-red-600 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {tooltipText}
                </div>
            )}
        </div>
    );
};
