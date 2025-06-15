'use client';
import { useState } from 'react';
import { IoChevronDownOutline, IoChevronUp } from 'react-icons/io5';

interface Item {
  title: string;
  content: string;
}

interface AccordionProps {
  items: Item[];
}

export const Accordion = ({ items }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (

    <div className="divide-y divide-gray-200">
      {items.map((item, index) => (
        <div key={index} className="py-4">
          <button
            onClick={() => toggle(index)}
            className="flex items-center justify-between gap-5 md:gap-0 w-full font-medium text-left  transition hover:text-gray-500 "
          >
            <p className='xs:text-sm md:text-xl' >{item.title}</p>
            {openIndex === index ? (
              <IoChevronUp className="w-5 h-5 fade-in text-gray-600 flex-shrink-0" />
            ) : (
              <IoChevronDownOutline className="w-5 h-5 fade-in text-gray-600 flex-shrink-0" />
            )}
          </button>

          {openIndex === index && (
            <div className="mt-2 text-md fade-in text-gray-900" style={{ textAlign: 'justify' }}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>

  );
};
