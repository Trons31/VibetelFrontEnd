import { FaPhoneAlt } from "react-icons/fa";

export default function SupportPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]  px-2 md:px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg text-center">
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-10 md:h-16 w-10 md:w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728"
            />
          </svg>
        </div>

        <h1 className="text-md md:text-2xl font-bold text-gray-800 mb-2">
          Soporte disponible muy pronto
        </h1>
        <p className="text-sm md:text-base text-gray-600 mb-6">
          Estamos trabajando para ofrecer soporte directo desde la plataforma.
          Por el momento, puedes contactarnos a nuestro soporte disponible las 24 horas vía llamada
          telefónica.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-xl p-2 md:p-4">
          <p className="text-red-700 flex gap-2 justify-center items-center font-semibold text-lg">
            <FaPhoneAlt />  304 120 1032
          </p>
          <p className="text-red-500 text-xs md:text-sm">Atención disponible las 24 horas</p>
        </div>
      </div>
    </div>
  );
}
