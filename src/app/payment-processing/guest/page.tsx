import { StatusCheckOut } from "@/components";
import { UiPage } from "./ui/UiPage";

export async function generateMetadata() {
  return {
    title: 'Verificar reserva anónima',
    description: 'Revisa cuidadosamente los detalles de tu reserva anónima, incluyendo la habitación seleccionada, el total a pagar, la comisión de VibeTel y las fechas de entrada y salida, manteniendo tu privacidad.',
  };
}

export default function CheckOutInAnonymousPage() {

  return (
    <div className="bg-gray-100 md:pt-20 pb-10">

      <div className="pt-5 md:pt-0 md:px-10" >
        <StatusCheckOut
          title="Reserva anonima en proceso"
        />
      </div>
      <UiPage /> 
    </div>
  );
}

