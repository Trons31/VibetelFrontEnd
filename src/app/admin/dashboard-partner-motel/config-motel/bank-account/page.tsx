import { BreadCrumb } from "@/components";
import { BankAccountForm } from "./ui/BankAccountForm";
import { getAccountType, getAllBanks, getBankAccountByMotel, getMotelByMotelPartner } from "@/actions";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { MotelApi } from "@/interfaces";
import axios from "axios";

export default async function BanckAccountPage() {

    const session = await auth();
    if (!session?.user.roles.includes("motelPartner")) {
        redirect("/motel-partner")
    }
    let motelExist: MotelApi | null = null;

    try {
        const response = await axios.get<MotelApi>(
            `${process.env.NEXT_PUBLIC_API_ROUTE}motel/user`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            }
        );

        motelExist = response.data;
    } catch (error: any) {
        redirect("/auth/new-account-motel/register");
    }
    const banks = await getAllBanks();
    const accountType = await getAccountType();

    const bankAccount = await getBankAccountByMotel(motelExist?.id!);

    return (
        <>
            <div className="bg-white rounded-xl mb-10">
                <div className="py-10 px-5 md:mx-20" >
                    <div className="" >
                        <p className="text-lg md:text-2xl font-bold" >Cuenta bancaria</p>
                        <BreadCrumb
                            breadcrumbCurrent="Cuenta bancaria"
                            urlCurrent="/admin/dashboard-partner-motel/config-motel/bank-account"

                            breadcrumbStart="configuracion"
                            urlStart="/admin/dashboard-partner-motel"
                        />
                        {
                            bankAccount.bankAccount
                                ? (
                                    <p className="text-xs md:text-sm mt-2">
                                        Ya has registrado tu cuenta bancaria, pero es crucial mantenerla actualizada para recibir los pagos directos a través de nuestra plataforma sin inconvenientes. Verifica que la información proporcionada sea correcta y esté al día para evitar posibles retrasos en el procesamiento de los pagos de tus reservas.
                                    </p>

                                ) : (
                                    <p className="text-xs md:text-sm mt-2">
                                        Es importante registrar una cuenta bancaria válida para recibir los pagos directos a través de nuestra plataforma. Asegúrate de proporcionar la información correcta para evitar retrasos en el procesamiento de los pagos de tus reservas.
                                    </p>
                                )
                        }

                    </div>

                    <BankAccountForm
                        bank={banks.banks}
                        accountType={accountType.accountType}
                        bankAccount={bankAccount.bankAccount}
                        motelId={motelExist?.id!}
                    />

                </div>

            </div >
        </>
    );
}