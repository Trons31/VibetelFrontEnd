import { ModalStatusPaymentAddTimeReservation } from "@/components";
import { UiContent } from "./ui/UiContent";


export async function generateMetadata() {
    return {
        title: 'Reserva anonima',
        description: `Por favor revisa cuidadosamente tu reserva`,
    };
}

interface Props {
    searchParams: { ref_payco?: string, codeBooking?: string };
}

export default function SearchBookingPage({ searchParams }: Props) {

    const { ref_payco, codeBooking } = searchParams;

    if (ref_payco) return (
        <>
            <ModalStatusPaymentAddTimeReservation
                reference={ref_payco}
            />

            <div className="h-screen" >

            </div>

        </>
    )

    return (
        <>
            <UiContent
                CodeBooking={codeBooking}
            />
        </>
    );
}