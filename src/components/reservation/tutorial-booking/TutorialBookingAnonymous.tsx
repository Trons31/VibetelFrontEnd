"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TutorialBookingAnonymous = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [highlightPosition, setHighlightPosition] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const tutorialSteps = [
    {
      title: "Bienvenido al Gestor de Reservas",
      description: "Te guiaremos paso a paso para gestionar tu reserva fácilmente.",
      target: null,
      position: "center"
    },
    {
      title: "Estado de tu Reserva",
      description: "Aquí puedes ver el estado actual de tu reserva.",
      target: "state-section",
      position: "top"
    },
    {
      title: "Detalles de la Reserva",
      description: "Encuentra el código de reserva y fechas importantes.",
      target: "details-section",
      position: "top"
    },
    {
      title: "Seguimiento de la Reserva",
      description: "Historial completo de eventos relacionados con tu reserva.",
      target: "tracker-section",
      position: "top"
    },
    {
      title: "Menú de Gestión",
      description: "Acciones como confirmar salida o solicitar acceso.",
      target: "side-menu",
      position: "right"
    },
    {
      title: "Protección de Privacidad",
      description: "Recuerda hacer clic en 'Salir y proteger reserva'.",
      target: "privacy-section",
      position: "top"
    },
    {
      title: "Tutorial Completo",
      description: "¡Ya estás listo para gestionar tu reserva!",
      target: null,
      position: "center"
    }
  ];

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  useEffect(() => {
    const savedPreference = localStorage.getItem('hideTutorial');
    if (savedPreference === 'true') {
      setShowTutorial(false);
    }
  }, []);

  const handleFinishTutorial = () => {
    if (dontShowAgain) {
      localStorage.setItem('hideTutorial', 'true');
    }
    setShowTutorial(false);
  };

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Función para actualizar la posición del resaltado
  const updateHighlightPosition = () => {
    const step = tutorialSteps[currentStep];
    if (!step.target) {
      setHighlightPosition(null);
      return;
    }

    const element = document.getElementById(step.target);
    if (element) {
      const rect = element.getBoundingClientRect();
      setHighlightPosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    } else {
      setHighlightPosition(null);
    }
  };

  // Hacer scroll al elemento y actualizar la posición del resaltado
  useEffect(() => {
    const step = tutorialSteps[currentStep];
    if (step.target) {
      const element = document.getElementById(step.target);
      if (element) {
        // Scroll suave al elemento
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
        // Esperar un breve momento para que el scroll termine antes de calcular la posición
        setTimeout(updateHighlightPosition, 300);
      }
    } else {
      setHighlightPosition(null);
    }

    // Actualizar la posición si el usuario hace scroll
    window.addEventListener('scroll', updateHighlightPosition);
    window.addEventListener('resize', updateHighlightPosition);

    return () => {
      window.removeEventListener('scroll', updateHighlightPosition);
      window.removeEventListener('resize', updateHighlightPosition);
    };
  }, [currentStep]); // Se ejecutará cuando cambie el paso

  if (!showTutorial) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Fondo oscurecido con agujero para el área resaltada */}
      {highlightPosition && (
        <>
          {/* Parte superior del overlay */}
          <div
            className="absolute bg-black bg-opacity-80 backdrop-blur-sm"
            style={{
              top: 0,
              left: 0,
              right: 0,
              height: highlightPosition.top,
            }}
          />
          {/* Parte izquierda del overlay */}
          <div
            className="absolute bg-black bg-opacity-80 backdrop-blur-sm"
            style={{
              top: highlightPosition.top,
              left: 0,
              width: highlightPosition.left,
              height: highlightPosition.height,
            }}
          />
          {/* Parte derecha del overlay */}
          <div
            className="absolute bg-black bg-opacity-80 backdrop-blur-sm"
            style={{
              top: highlightPosition.top,
              left: highlightPosition.left + highlightPosition.width,
              right: 0,
              height: highlightPosition.height,
            }}
          />
          {/* Parte inferior del overlay */}
          <div
            className="absolute bg-black bg-opacity-80 backdrop-blur-sm"
            style={{
              top: highlightPosition.top + highlightPosition.height,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </>
      )}

      {/* Overlay completo para cuando no hay elemento resaltado */}
      {!highlightPosition && (
        <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm" />
      )}

      {/* Borde de resaltado */}
      {highlightPosition && (
        <div
          className="fixed border-4 border-blue-500 rounded-xl z-10 pointer-events-none"
          style={{
            top: highlightPosition.top,
            left: highlightPosition.left,
            width: highlightPosition.width,
            height: highlightPosition.height,
            transition: 'all 0.3s ease-in-out',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.8)',
          }}
        />
      )}

      {/* Viñeta explicativa - Sin cambios aquí, se ha copiado la tuya. */}
      <AnimatePresence>
        <motion.div
          className={`fixed z-[10000] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl p-4 w-full 
            ${isMobile
              ? 'bottom-0 left-0 right-0 max-h-[50vh] overflow-y-auto'
              : tutorialSteps[currentStep].position === 'center'
                ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md'
                : tutorialSteps[currentStep].position === 'top'
                  ? 'top-8 left-1/2 transform -translate-x-1/2 max-w-md'
                  : 'top-1/2 right-8 transform -translate-y-1/2 max-w-sm'
            }`}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: 1,
            y: isMobile ? 0 : (tutorialSteps[currentStep].position === 'top' ? 0 : 0)
          }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {currentStep + 1}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">
                {currentStep + 1}/{tutorialSteps.length}
              </span>
            </div>

            <button
              onClick={() => setShowTutorial(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {tutorialSteps[currentStep].title}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {tutorialSteps[currentStep].description}
          </p>

          <div className="flex justify-between items-center mb-3">
            {currentStep > 0 ? (
              <button
                onClick={prevStep}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span className={isMobile ? 'hidden' : 'block'}>Anterior</span>
              </button>
            ) : (
              <div></div>
            )}

            <button
              onClick={currentStep === tutorialSteps.length - 1 ? handleFinishTutorial : nextStep}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg font-medium flex items-center gap-1`}
            >
              {currentStep === tutorialSteps.length - 1 ? (
                'Finalizar'
              ) : (
                <>
                  <span className={isMobile ? 'hidden' : 'block'}>Siguiente</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {currentStep === tutorialSteps.length - 1 && (
            <div className='flex justify-center mb-2'>
              <label className="flex items-center text-xs text-gray-600">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="mr-2 h-4 w-4 text-blue-600 rounded"
                />
                No volver a mostrar este tutorial
              </label>
            </div>
          )}

          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full"
              style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
            ></div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};