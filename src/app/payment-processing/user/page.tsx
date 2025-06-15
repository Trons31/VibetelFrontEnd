import { ReservationExpiryTimer, StatusCheckOut } from "@/components";
import { UiPage } from "./ui/UiPage";

export async function generateMetadata() {
  return {
    title: 'Verificar reserva',
    description: 'Revisa cuidadosamente los detalles de tu reserva, incluyendo la habitación seleccionada, el total a pagar, la comisión de VibeTel y las fechas de entrada y salida.',
  };
}


export default function CheckOutInUserPage() {
  return (
    <div className="bg-gray-100 md:pt-20 pb-10">

      <div className="pt-5 md:pt-0 md:px-10" >
        <StatusCheckOut
          title="Reserva en proceso"
        />
      </div>
      <ReservationExpiryTimer />
      <UiPage />
    </div>
  );
}

