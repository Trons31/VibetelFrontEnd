'use client';
import { ReactNode, useEffect } from "react";

interface ModalProps {
  title?: string;
  children: ReactNode;
  FotterPersoanlized?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalPopup = ({ title, children, isOpen, onClose, FotterPersoanlized }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };



  return (
    <div
      className="fixed fade-in inset-0 z-50 overflow-y-hidden md:p-5 py-5 px-0 w-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white md:rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 px-2 py-3 md:p-6 max-h-full overflow-y-auto">
        <h2 className="text-xl font-semibold capitalize mb-4">{title}</h2>
        <div>{children}</div>
        {!FotterPersoanlized && (
          <div className="flex justify-end">
            <button
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>

  );
};

