import { UiPage } from "./ui/UiPage";

interface Props {
    searchParams: { ref_payco?: string };
}

const CheckOutStatusPage = ({ searchParams }: Props) => {

    const { ref_payco } = searchParams;

    return (
        <div className="bg-gray-100 pb-10 h-screen ">
            <UiPage reference={ref_payco!} />
        </div>
    );
};

export async function generateMetadata({ searchParams }: { searchParams: { ref_payco?: string } }) {
    return {
        title: 'Estado de reserva',
        description: `Estado de la transacción con referencia ${searchParams.ref_payco}`,
    };
}

export default CheckOutStatusPage;
