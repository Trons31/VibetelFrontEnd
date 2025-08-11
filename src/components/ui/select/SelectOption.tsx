'use client';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface Option {
  label: string;
  value: number;
}

interface SelectOptionProps {
  options: Option[];
  className?:string;
  classNameSelect?:string;
  defaultOption?: Option;
  onOptionSelect: (option: Option) => void;
}

export const SelectOption = ({ options, defaultOption, onOptionSelect,className,classNameSelect }: SelectOptionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>(defaultOption || options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onOptionSelect(option);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div onClick={toggleDropdown} className={`flex justify-between items-center cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-400 ${classNameSelect}`}>
        <span>{selectedOption.label}</span>
        {isOpen ? <IoIosArrowUp className="h-4 w-4" /> : <IoIosArrowDown className="h-4 w-4" />}
      </div>

      {isOpen && (
        <ul className="absolute z-10 w-full h-fit custom-scrollbar overflow-y-auto bg-white mt-1 border rounded-lg shadow-xl transition-all duration-300">
          {options.map((option) => (
            <li
              key={option.value}
              className="cursor-pointer px-3 py-2 text-xs md:text-sm  hover:bg-blue-500 hover:text-white"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

