"use client";
import React, { useState, useRef, useEffect } from "react";

interface PopoverProps {
    children: React.ReactNode;
    popoverContent: React.ReactNode;
    align?: "left" | "right";
}

export const OptionsPopover = ({ children, popoverContent, align = "right" }: PopoverProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <div className="relative inline-block">
            <button
                ref={buttonRef}
                onClick={handleToggle}
                className="rounded-full py-1.5 px-3 border border-black text-xs text-black hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2"
            >
                {children}
            </button>

            {isOpen && (
                <div
                    ref={popoverRef}
                    className={`absolute mt-2 w-60 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-40  ${align === "right" ? "right-0" : "left-0"
                        }`}
                >
                    {popoverContent}
                </div>
            )}
        </div>
    );
};
