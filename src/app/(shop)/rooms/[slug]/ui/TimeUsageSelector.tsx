"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Props {
    currentTimeLimit: number;
    onTimeLimitChange: (hours: number) => void;
}

export const TimeUsageSelector = ({
    currentTimeLimit,
    onTimeLimitChange,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownDirection, setDropdownDirection] = useState<'down' | 'up'>('down');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const timeOptions = [
        { value: 1, label: "1 hora" },
        { value: 2, label: "2 horas" },
        { value: 3, label: "3 horas" },
    ];

    const toggleDropdown = () => {
        if (!isOpen) {
            // Calcular la dirección antes de abrir
            calculateDropdownDirection();
        }
        setIsOpen(!isOpen);
    };

    const calculateDropdownDirection = () => {
        if (buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - buttonRect.bottom;
            const dropdownHeight = timeOptions.length * 44; // Aprox. 44px por opción

            setDropdownDirection(spaceBelow > dropdownHeight + 10 ? 'down' : 'up');
        }
    };

    const handleOptionClick = (hours: number) => {
        onTimeLimitChange(hours);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleResize = () => {
            if (isOpen) {
                calculateDropdownDirection();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", handleResize);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("resize", handleResize);
        };
    }, [isOpen]);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className="mt-2 border text-start w-full border-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 flex justify-between items-center"
            >
                <div>
                    <p className="text-xs font-semibold">Tiempo de uso</p>
                    <p className="text-sm font-extralight mt-1">
                        {currentTimeLimit} {currentTimeLimit === 1 ? "hora" : "horas"}
                    </p>
                </div>
                {isOpen ? (
                    <FaChevronUp className="h-4 w-4" />
                ) : (
                    <FaChevronDown className="h-4 w-4" />
                )}
            </button>

            {isOpen && (
                <div
                    className={`absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden ${dropdownDirection === 'down' ? 'mt-1 top-full' : 'mb-1 bottom-full'}`}
                >
                    {timeOptions.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleOptionClick(option.value)}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${currentTimeLimit === option.value ? "bg-blue-50" : ""
                                }`}
                        >
                            <p className="text-sm">
                                {option.label}
                                {currentTimeLimit === option.value && (
                                    <span className="ml-2 text-blue-600">✓</span>
                                )}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};