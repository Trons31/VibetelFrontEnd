import { DeleteBooking } from "./ui/DeleteBooking";

export async function generateMetadata() {
  return {
    title: 'Checkout - Detalles de tu Reserva',
    description: 'En esta página encontrarás los detalles del proceso de tu reserva, siempre y cuando inicies el proceso de reserva de una habitación.',
  };
}
export default function EmptyPage() {
  return (
    <div className="flex flex-col md:flex-row items-center h-screen bg-gray-100 justify-center" >
      <DeleteBooking />
    </div>
  );
}