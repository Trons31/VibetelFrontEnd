'use client';

import { useForm } from "react-hook-form";
import { AmenitiesMotelInfo, City, CityApi, CountryApi, DepartmentApi } from "@/interfaces";
import clsx from "clsx";
import { IoAlertCircleOutline } from "react-icons/io5"
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { ModalPopup } from "@/components";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

type FormInputs = {
    nameRepresent: string;
    idRepresent: string;

    name: string;
    contactPhone: string;
    whatsapp: string;
    nit: string;

    description: string;
    amentiesMotel: string[];

    country: string;
    department: string;
    city: string;
    address: string;
    neighborhood: string;
}


type FormMotelRepresentative = {
    nameRepresent: string;
    idRepresent: string;
}

type formDataMotel = {
    name: string;
    contactPhone: string;
    whatsapp: string;
    nit: string;

    description: string;
}

type formLocationAndAmenities = {
    amentiesMotel: string[];

    country: string;
    department: string;
    city: string;
    address: string;
    neighborhood: string;
}

type stepsForm = "representativeMotel" | "DataMotel" | "LocationAndAmenitiesMotel";

interface Props {
    motelPartner: string;
    countries: CountryApi[]
    departments: DepartmentApi[]
    cities: CityApi[]
    amenitiesMotel: AmenitiesMotelInfo[]
}

export const RegisterForm = ({ motelPartner, departments, countries, cities, amenitiesMotel }: Props) => {

    const [modalSaveProcess, setModalSaveProcess] = useState(false);
    const [stepsForm, setstepsForm] = useState<stepsForm>("representativeMotel");
    const [motelRepresentative, setMotelRepresentative] = useState<FormMotelRepresentative>();
    const [dataMotel, setDataMotel] = useState<formDataMotel>();
    const [locationAndAmenities, setLocationAndAmenities] = useState<formLocationAndAmenities>()

    const { data: session } = useSession();

    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showLoadingRegister, setShowLoadingRegister] = useState(false);


    const [inputsAmenities, setInputs] = useState<string[]>(['']);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const [filteredDepartments, setFilteredDepartments] = useState<DepartmentApi[]>([]);
    const [filteredCities, setFilteredCities] = useState<CityApi[]>([]);
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);


    const {
        register: registerMotel,
        handleSubmit: handleSubmitMotel,
        formState: { errors: errorsMotel },
        setValue: setValueMotel,
        trigger: triggerMotel,
        getValues: getValuesMotel
    } = useForm<formDataMotel>();

    const {
        register: registerRepresentative,
        handleSubmit: handleSubmitRepresentative,
        formState: { errors: errorsRepresentative },
        setValue: setValueRepresentative,
        trigger: triggerRepresentative,
        getValues: getValuesRepresentative
    } = useForm<FormMotelRepresentative>();

    const {
        register: registerLocationAndAmenities,
        handleSubmit: handleSubmitLocationAndAmenities,
        formState: { errors: errorsLocationAndAmenities },
        setValue: setValueLocationAndAmenities,
        trigger: triggerLocationAndAmenities,
        getValues: getValuesLocationAndAmenities
    } = useForm<formLocationAndAmenities>();

    const onSubtmitRepresentativeMotel = (data: FormMotelRepresentative) => {
        setMotelRepresentative(data)
        setstepsForm("DataMotel");
        localStorage.setItem("stepFormRegisterMotel", stepsForm);
    }

    const onSubmitMotel = (data: formDataMotel) => {
        setDataMotel(data);
        setstepsForm("LocationAndAmenitiesMotel")
    }

    const onSubmit = async (data: formLocationAndAmenities) => {
        if (!motelRepresentative) return;
        if (!dataMotel) return;
        setShowErrorMessage(false);
        setShowLoadingRegister(true);

        const trimmedName = dataMotel.name.trim();
        const formattedName = trimmedName.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('');

        const amenities: string[] = inputsAmenities


        const motelData = {
            identificationRepresentante: motelRepresentative.idRepresent,
            nombreRepresentante: motelRepresentative.nameRepresent,
            razonSocial: dataMotel.name,
            description: dataMotel.description,
            slug: formattedName,
            contactEmail: session?.user.email!,
            contactPhone: dataMotel.contactPhone,
            whatsapp: dataMotel.whatsapp,
            nit: dataMotel.nit,
            amenities: amenities,
            address: data.address,
            neighborhood: data.neighborhood,
            // if (selectedAmenities.length > 0) {
            //     for (let i = 0; i < selectedAmenities.length; i++) {
            //         formData.append('amenitiesMotel', selectedAmenities[i]);
            //     }
            // }
            cityId: data.city
        };

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}motel`, motelData, {
                headers: {
                    'Authorization': `Bearer ${session?.accessToken}`
                }
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error response:", error.response?.data);
            } else {
                console.error("Unexpected error:", error);
            }
            setShowLoadingRegister(false);
            setShowErrorMessage(true);
            setErrorMessage("Ups verifica que todos los datos sean correctos");
            toast.error("Ups! Error al ingresar los datos",
                {
                    duration: 4000
                }
            )
            return;
        }
        setShowLoadingRegister(true);
        window.location.replace('/auth/new-account-motel/motel-plans');

    }


    const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedCountryId = e.target.value;
        setSelectedCountry(selectedCountryId);

        setValueLocationAndAmenities('country', selectedCountryId);
        triggerLocationAndAmenities('country');

        const countryDepartments: DepartmentApi[] = departments.filter(department => department.country.geonameId === selectedCountryId);
        setFilteredDepartments(countryDepartments);

        setFilteredCities([]);
    };

    const handleDepartmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedDepartmentId = e.target.value;
        setSelectedDepartment(selectedDepartmentId);

        setValueLocationAndAmenities('department', selectedDepartmentId);
        triggerLocationAndAmenities('department');

        // Filtrar las ciudades según el departamento seleccionado
        const departmentCities: CityApi[] = cities.filter(city => city.department.geonameId === selectedDepartmentId);
        setFilteredCities(departmentCities);
    };



    const toggleAmenity = (id: string) => {
        if (selectedAmenities.includes(id)) {
            // Si el amenitie ya está seleccionado, lo deseleccionamos
            setSelectedAmenities(selectedAmenities.filter(amenityId => amenityId !== id));
        } else {
            // Si no está seleccionado, lo agregamos a la lista de seleccionados
            setSelectedAmenities([...selectedAmenities, id]);
        }

    };



    const handleInputChange = (index: number, value: string) => {
        const newInputs = [...inputsAmenities];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const handleAddInput = () => {
        setInputs([...inputsAmenities, '']);
    };

    const handleRemoveInput = (index: number) => {
        const newInputs = [...inputsAmenities];
        newInputs.splice(index, 1);
        setInputs(newInputs);
    };


    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <div>

                <ModalPopup
                    title="Guardar Progreso"
                    isOpen={modalSaveProcess}
                    FotterPersoanlized={true}
                    onClose={() => setModalSaveProcess(false)}
                >
                    <div className="p-4">
                        <p className="text-gray-700 mb-4">
                            ¿Deseas guardar tu progreso y continuar con el registro más tarde?
                            Podrás retomar desde donde lo dejaste cuando vuelvas a ingresar.
                        </p>
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                onClick={() => setModalSaveProcess(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 "
                            >
                                Continuar Registro
                            </button>
                            <button
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                            >
                                Guardar y Salir
                            </button>
                        </div>
                    </div>
                </ModalPopup>

                {
                    stepsForm === "representativeMotel" && (
                        <form className="fade-in" onSubmit={handleSubmitRepresentative(onSubtmitRepresentativeMotel)}>
                            <div className="px-5 md:mx-20 py-36" >

                                <div className="mt-2 md:mt-10" >
                                    <p className="text-3xl font-bold" >Datos basicos</p>
                                    <p className="text-black font-semibold text-lg mt-8 mb-2" >Datos del representante legal</p>
                                </div>
                                <div className="grid grid-cols md:grid-cols-2 mb-5 gap-5 md:gap-10">
                                    <div>
                                        <div className="relative w-full">
                                            <input type="text" className={
                                                clsx(
                                                    "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                                                    {
                                                        "focus:border-red-500 border-red-500": errorsRepresentative.nameRepresent
                                                    }
                                                )
                                            }

                                                placeholder=" "
                                                {...registerRepresentative('nameRepresent', { required: true })}
                                            />
                                            <label className={
                                                clsx(
                                                    "absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                                                    {
                                                        "peer-focus:text-red-500 text-red-500": errorsRepresentative.nameRepresent
                                                    }
                                                )
                                            }>Nombre</label>

                                        </div>

                                        {
                                            errorsRepresentative.nameRepresent?.type === 'required' && (
                                                <span className="text-red-500 text-xs" >* El nombre del representante legal es obligatorio</span>
                                            )
                                        }
                                        <span className="text-xs text-gray-500 block mt-1">
                                            Por favor, asegúrate de proporcionar el nombre completo del representante legal. Este dato es esencial para validar y garantizar la seguridad del registro de tu motel.
                                        </span>


                                    </div>

                                    <div>
                                        <div className="relative w-full">
                                            <input type="text" className={
                                                clsx(
                                                    "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                                                    {
                                                        "focus:border-red-500 border-red-500": errorsRepresentative.idRepresent
                                                    }
                                                )
                                            } placeholder=" "
                                                {...registerRepresentative('idRepresent', { required: true })}
                                            />
                                            <label className={
                                                clsx(
                                                    "absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                                                    {
                                                        "peer-focus:text-red-500 text-red-500": errorsRepresentative.idRepresent
                                                    }
                                                )
                                            }>cedula</label>

                                            {
                                                errorsRepresentative.idRepresent?.type === 'required' && (
                                                    <span className="text-red-500 text-xs" >* La cedula del representante legal es obligatoria</span>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <footer className="fixed z-10 bottom-0 w-full border-t-gray-300 text-gray-600 bg-white border-t  border-gray-200  
                              shadow-lg shadow-gray-500 body-font">
                                <div className="px-2 md:px-10 py-5 flex justify-between items-center gap-3 flex-col-reverse md:flex-row"
                                >

                                    <button
                                        type="button"
                                        onClick={() => setModalSaveProcess(true)}
                                        className="bg-white w-full md:w-fit border border-black hover:bg-black hover:text-white text-black py-2 px-3 text-sm rounded-lg transition-all duration-300" >
                                        Guardar y salir
                                    </button>


                                    <button
                                        type='submit'
                                        disabled={showLoadingRegister}
                                        className={
                                            clsx(

                                                {
                                                    "flex w-full md:w-fit items-center gap-x-4 justify-center rounded-lg bg-red-600 px-3 py-2 hover:bg-red-700 text-sm text-white": !showLoadingRegister,
                                                    "flex w-full md:w-fit items-center gap-x-4  justify-center rounded-lg bg-red-600 px-3 py-2 text-sm text-white cursor-not-allowed": showLoadingRegister
                                                }
                                            )
                                        }>
                                        {
                                            showLoadingRegister &&
                                            (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>)
                                        }

                                        {
                                            showLoadingRegister
                                                ? (
                                                    <span>Cargando...</span>
                                                ) : (
                                                    <span>Continuar</span>
                                                )
                                        }

                                    </button>

                                </div>
                            </footer>
                        </form>
                    )
                }

                {
                    stepsForm === "DataMotel" && (
                        <form className="fade-in" onSubmit={handleSubmitMotel(onSubmitMotel)}>
                            <div className="px-5 md:mx-20 py-36" >

                                <div className="mt-2 md:mt-10" >
                                    <p className="text-3xl font-bold" >Datos basicos</p>
                                    <p className={`  text-black font-semibold text-lg mt-5 mb-2`} >Datos del motel</p>
                                </div>

                                <div className="grid grid-cols md:grid-cols-2 mb-5 gap-5 md:gap-10">
                                    <div>
                                        <div className="relative w-full">
                                            <input type="text" className={
                                                clsx(
                                                    "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                                                    {
                                                        "focus:border-red-500 border-red-500": errorsMotel.name
                                                    }
                                                )
                                            }

                                                placeholder=" "
                                                {...registerMotel('name', { required: true })}
                                            />
                                            <label className={
                                                clsx(
                                                    "absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                                                    {
                                                        "peer-focus:text-red-500 text-red-500": errorsMotel.name
                                                    }
                                                )
                                            }>Razon social</label>
                                        </div>
                                        {
                                            errorsMotel.name?.type === 'required' && (
                                                <span className="text-red-500 text-xs" >* El nombre es obligatorio</span>
                                            )
                                        }
                                        <span className="text-xs text-gray-500 block ">El nombre del motel estará así en la app</span>

                                    </div>

                                    <div>
                                        <div className="relative w-full">
                                            <input type="text" className={
                                                clsx(
                                                    "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                                                    {
                                                        "focus:border-red-500 border-red-500": errorsMotel.nit
                                                    }
                                                )
                                            }

                                                placeholder=" "
                                                {...registerMotel('nit', { required: true })}
                                            />
                                            <label className={
                                                clsx(
                                                    "absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                                                    {
                                                        "peer-focus:text-red-500 text-red-500": errorsMotel.nit
                                                    }
                                                )
                                            }>Nit del motel</label>
                                        </div>
                                        {
                                            errorsMotel.name?.type === 'required' && (
                                                <span className="text-red-500 text-xs" >* El nit es obligatorio</span>
                                            )
                                        }
                                        <span className="text-xs text-gray-500 block">
                                            El NIT (Número de Identificación Tributaria) es crucial para el registro y funcionamiento legal del motel.
                                        </span>

                                    </div>
                                </div>
                                <div className="grid grid-cols md:grid-cols-2 mb-10 md:mb-5 gap-5 md:gap-10 " >

                                    <div>
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 z-10 bg-blue-600 inline-flex items-center py-3.5 px-4 text-sm font-medium text-center text-white  border border-gray-300 rounded-s-lg focus:ring-gray-100" >
                                                +57
                                            </div>

                                            <div className="relative w-full">
                                                <input type="text" className={
                                                    clsx(
                                                        "block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-l-none text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                                                        {
                                                            "focus:border-red-500 border-red-500": errorsMotel.contactPhone
                                                        }
                                                    )
                                                }
                                                    {...registerMotel('contactPhone', { required: true, pattern: /^\s*([3][0-9]{9})\s*$/ })}

                                                    placeholder=" "

                                                />
                                                <label className={
                                                    clsx(
                                                        "absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                                                        {
                                                            "peer-focus:text-red-500 text-red-500": errorsMotel.contactPhone
                                                        }
                                                    )
                                                }>Telefono del motel</label>
                                            </div>
                                        </div>



                                        {
                                            errorsMotel.contactPhone?.type === 'required' && (
                                                <span className="text-red-500 text-xs" >* El numero telefono es obligatorio</span>
                                            )
                                        }
                                        {
                                            errorsMotel.contactPhone?.type === 'pattern' && (
                                                <span className="text-red-500 text-xs" >* El numero telefono debe ser valido</span>
                                            )
                                        }
                                        <span className="text-xs text-gray-500 block ">Este telefono sera utilizado para contactar al motel para temas relacionados a la operacion en linea en motelero online</span>
                                    </div>

                                    <div>
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 z-10 bg-blue-600 inline-flex items-center py-3.5 px-4 text-sm font-medium text-center text-white  border border-gray-300 rounded-s-lg focus:ring-gray-100" >
                                                +57
                                            </div>

                                            <div className="relative w-full">
                                                <input type="text" className={
                                                    clsx(
                                                        "block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-l-none text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                                                        {
                                                            "focus:border-red-500 border-red-500": errorsMotel.whatsapp
                                                        }
                                                    )
                                                }
                                                    {...registerMotel('whatsapp', { required: true, pattern: /^\s*([3][0-9]{9})\s*$/ })}

                                                    placeholder=" "

                                                />
                                                <label className={
                                                    clsx(
                                                        "absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                                                        {
                                                            "peer-focus:text-red-500 text-red-500": errorsMotel.whatsapp
                                                        }
                                                    )
                                                }>whatsapp</label>
                                            </div>
                                        </div>



                                        {
                                            errorsMotel.whatsapp?.type === 'required' && (
                                                <span className="text-red-500 text-xs" >* El numero telefono es obligatorio</span>
                                            )
                                        }
                                        {
                                            errorsMotel.whatsapp?.type === 'pattern' && (
                                                <span className="text-red-500 text-xs" >* El numero telefono debe ser valido</span>
                                            )
                                        }
                                        <span className="text-xs text-gray-500 block ">
                                            El número de WhatsApp será utilizado para que los usuarios puedan comunicarse directamente con el motel en caso de tener alguna duda
                                        </span>
                                    </div>

                                </div>

                                <div className="grid grid-cols gap-5 md:gap-10 " >
                                    <div>
                                        <div className="relative w-full">
                                            <textarea
                                                rows={8}
                                                className={clsx(
                                                    "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500",
                                                    { "border-red-500": errorsMotel.description }
                                                )}
                                                placeholder="ej : Acogedor motel ubicado en las afueras de la ciudad, perfecto para quienes buscan una estancia tranquila y privada. Contamos con habitaciones limpias y bien equipadas, servicio de recepción las 24 horas y amplio estacionamiento. Ideal para viajeros de paso o para una escapada de fin de semana."
                                                {...registerMotel('description', { required: true })}
                                            ></textarea>
                                            <label className={clsx(
                                                "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
                                                { "text-red-500": errorsMotel.description }
                                            )}>Descripcion del motel</label>
                                        </div>
                                        {
                                            errorsMotel.description?.type === 'required' && (
                                                <span className="text-red-500 text-xs">* La descripción es obligatoria</span>
                                            )
                                        }
                                        {
                                            errorsMotel.description?.type === 'pattern' && (
                                                <span className="text-red-500 text-xs">* La descripción debe tener al menos 30 palabras</span>
                                            )
                                        }
                                        <span className="text-xs text-gray-500 block">Recuerda que la descripción que proporciones aquí aparecerá en la aplicación. Es importante que sea clara y detallada para atraer a los usuarios adecuados.</span>
                                    </div>


                                </div>

                            </div>

                            <footer className="fixed z-10 bottom-0 w-full border-t-gray-300 text-gray-600 bg-white border-t  border-gray-200  
                                shadow-lg shadow-gray-500 body-font">
                                <div className="px-2 md:px-10 py-5 flex justify-between items-center gap-3 flex-col-reverse md:flex-row">
                                    <div className="flex w-full flex-col-reverse md:flex-row items-center gap-2" >
                                        <button
                                            type="button"
                                            onClick={() => setModalSaveProcess(true)}
                                            className="bg-white w-full md:w-fit border border-black hover:bg-black hover:text-white text-black py-2 px-3 text-sm rounded-lg transition-all duration-300" >
                                            Guardar y salir
                                        </button>
                                        <button
                                            onClick={() => setstepsForm("representativeMotel")}
                                            className="bg-white text-black border border-black hover:bg-black hover:text-white w-full md:w-fit rounded-lg py-2 px-3 text-sm" >
                                            volver
                                        </button>
                                    </div>

                                    <button
                                        type='submit'
                                        disabled={showLoadingRegister}
                                        className={
                                            clsx(

                                                {
                                                    "flex w-full md:w-fit items-center gap-x-4 justify-center rounded-lg bg-red-600 px-3 py-2 hover:bg-red-700 text-sm text-white": !showLoadingRegister,
                                                    "flex w-full md:w-fit items-center gap-x-4 justify-center rounded-lg bg-red-600 px-3 py-2 text-sm text-white cursor-not-allowed": showLoadingRegister
                                                }
                                            )
                                        }>
                                        {
                                            showLoadingRegister &&
                                            (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>)
                                        }

                                        {
                                            showLoadingRegister
                                                ? (
                                                    <span>Cargando...</span>
                                                ) : (
                                                    <span>Continuar</span>
                                                )
                                        }

                                    </button>

                                </div>
                            </footer>
                        </form>
                    )
                }

                {
                    stepsForm === "LocationAndAmenitiesMotel" && (
                        <form className="fade-in" onSubmit={handleSubmitLocationAndAmenities(onSubmit)}>
                            <div className="px-5 md:mx-20 py-36" >

                                <div className="mt-2 md:mt-10" >
                                    <p className="text-3xl font-bold" >Datos basicos</p>
                                    <p className={`  text-black font-semibold text-lg mt-5 mb-2`} >Ubicacion y comodidades</p>
                                </div>

                                <div className="p-4 mb-4 mt-14 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 " role="alert">
                                    <div className="flex gap-2 items-center">
                                        <IoAlertCircleOutline size={20} />
                                        <span className="sr-only">Información</span>
                                        <h3 className="text-lg font-medium">¡Pronto en más ciudades!</h3>
                                    </div>
                                    <div className="mt-2 mb-4 text-sm">
                                        Actualmente, nuestro servicio está disponible únicamente en la ciudad de Sincelejo. Sin embargo, nos complace informarte que pronto estaremos expandiéndonos a más ciudades de Colombia. ¡Estén atentos para disfrutar de nuestros servicios en nuevas ubicaciones!
                                    </div>
                                    <div className="text-sm text-gray-600 font-extralight">
                                        Nota: Solo estamos en Colombia por ahora, pero pronto estaremos en más países.
                                    </div>
                                </div>



                                <div className="mt-14 mb-5" >
                                    <p className="text-black font-semibold text-lg mb-2" >Ubicacion</p>
                                </div>

                                <div className="grid grid-cols md:grid-cols-2 mb-5 gap-5 md:gap-10">
                                    <div>
                                        <div className="relative w-full">
                                            <select
                                                className={
                                                    clsx(
                                                        "block  px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-xl border border-gray-300 ",
                                                        {
                                                            "border-red-500": errorsLocationAndAmenities.country
                                                        }
                                                    )
                                                }
                                                {...registerLocationAndAmenities('country', { required: true })}
                                                onChange={handleCountryChange}
                                            >
                                                <option value=""> [ Seleccione país]</option>
                                                {countries.map(country => (
                                                    <option key={country.geonameId} value={country.geonameId}>{country.name}</option>
                                                ))}
                                            </select>

                                            <label
                                                className={
                                                    clsx(
                                                        "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
                                                        {
                                                            "text-red-500": errorsLocationAndAmenities.country
                                                        }
                                                    )
                                                }
                                            >
                                                País
                                            </label>
                                        </div>
                                        {
                                            errorsLocationAndAmenities.country?.type === 'required' && (
                                                <span className="text-red-500 text-xs">* Seleccione un pais</span>
                                            )
                                        }
                                    </div>

                                    <div>
                                        <div className="relative w-full">
                                            <select
                                                className={
                                                    clsx(
                                                        "block  px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-xl border border-gray-300 ",
                                                        {
                                                            "border-red-500": errorsLocationAndAmenities.department,
                                                            "cursor-not-allowed": !selectedCountry
                                                        }
                                                    )
                                                }
                                                defaultValue=""

                                                disabled={!selectedCountry}
                                                {...registerLocationAndAmenities('department', { required: true })}
                                                onChange={handleDepartmentChange}
                                            >
                                                <option value=""> [ Seleccione departamento ]</option>
                                                {filteredDepartments.map(department => (
                                                    <option key={department.geonameId} value={department.geonameId}>{department.name}</option>
                                                ))}
                                            </select>
                                            <label
                                                className={
                                                    clsx(
                                                        "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
                                                        {
                                                            "text-red-500": errorsLocationAndAmenities.department
                                                        }
                                                    )
                                                }
                                            >
                                                Departamento
                                            </label>
                                        </div>
                                        {
                                            errorsLocationAndAmenities.department?.type === 'required' && (
                                                <span className="text-red-500 text-xs">* Seleccione un departamento</span>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="grid grid-cols mb-5">
                                    <div>
                                        <div className="relative w-full">
                                            <select
                                                className={
                                                    clsx(
                                                        "block  px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-xl border border-gray-300 ",
                                                        {
                                                            "border-red-500": errorsLocationAndAmenities.city,
                                                            "cursor-not-allowed": !selectedDepartment
                                                        }
                                                    )
                                                }
                                                defaultValue=""
                                                {...registerLocationAndAmenities('city', { required: true })}
                                                disabled={!selectedDepartment}
                                            >
                                                <option 
                                                value=""
                                                 disabled> [ Seleccione ciudad ]</option>
                                                {filteredCities.map(city => (
                                                    <option key={city.id} value={city.id}>{city.name}</option>
                                                ))}
                                            </select>
                                            <label
                                                className={
                                                    clsx(
                                                        "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
                                                        {
                                                            "text-red-500": errorsLocationAndAmenities.city
                                                        }
                                                    )
                                                }
                                            >
                                                Ciudad
                                            </label>
                                        </div>
                                        {
                                            errorsLocationAndAmenities.city?.type === 'required' && (
                                                <span className="text-red-500 text-xs">* Seleccione un ciudad</span>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="grid grid-cols  md:grid-cols-2 gap-5" >
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            className={clsx(
                                                "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                                                { "focus:border-red-500 border-red-500": errorsLocationAndAmenities.address }
                                            )}
                                            placeholder=" "
                                            {...registerLocationAndAmenities('address', { required: true })}
                                        />
                                        <label className={
                                            clsx(
                                                "absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                                                {
                                                    "peer-focus:text-red-500 text-red-500": errorsLocationAndAmenities.address
                                                }
                                            )
                                        }>Dirección</label>
                                        {
                                            errorsLocationAndAmenities.address?.type === 'required' && (
                                                <span className="text-red-500 text-xs">* La direccion es obligatoria</span>
                                            )
                                        }
                                        <span className="text-xs text-gray-500 block">Por favor, ingrese la dirección completa del motel, incluyendo el nombre de la calle y edificio.</span>

                                    </div>

                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            className={clsx(
                                                "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                                                { "focus:border-red-500 border-red-500": errorsLocationAndAmenities.neighborhood }
                                            )}
                                            placeholder=" "
                                            {...registerLocationAndAmenities('neighborhood', { required: true })}
                                        />
                                        <label className={
                                            clsx(
                                                "absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                                                {
                                                    "peer-focus:text-red-500 text-red-500": errorsLocationAndAmenities.neighborhood
                                                }
                                            )
                                        }>Barrio o sector</label>
                                        {
                                            errorsLocationAndAmenities.neighborhood?.type === 'required' && (
                                                <span className="text-red-500 text-xs">* El barrio o sector es obligatorio</span>
                                            )
                                        }
                                        <span className="text-xs text-gray-500 block">Por favor, ingrese el nombre del barrio o sector donde se encuentra el motel.</span>
                                    </div>

                                </div>

                                <div className="mt-14 mb-5" >
                                    <p className="text-black font-semibold text-lg mb-1" >Comodidades </p>
                                    <p className="text-sm text-gray-700 " >Por favor, indica las comodidades que ofrece tu motel. La selección de comodidades es opcional, pero altamente recomendada para atraer a más usuarios</p>
                                </div>

                                <div className="flex flex-wrap mb-10">
                                    <div className="grid w-full  gap-6 md:grid-cols-3 ">
                                        {amenitiesMotel.map((amenityMotel) => (
                                            <div key={amenityMotel.id} className="flex h-full" >
                                                <label
                                                    className={clsx(
                                                        "inline-flex items-center justify-between w-full p-5 text-gray-800 bg-white border-2 border-gray-200 rounded-lg cursor-pointer",
                                                        {
                                                            'hover:border-blue-600 hover:text-blue-500': !selectedAmenities.includes(amenityMotel.id),
                                                            'border-red-600 text-red-6s00 ': selectedAmenities.includes(amenityMotel.id)
                                                        }
                                                    )}
                                                    onClick={() => toggleAmenity(amenityMotel.id)}
                                                >
                                                    <div className="block">
                                                        <div className="w-full text-lg font-bold">{amenityMotel.name}</div>
                                                        <div className="w-full text-sm text-black">{amenityMotel.description}</div>
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-14 mb-5" >
                                    <p className="text-black font-semibold text-lg mt-5 mb-1" >Otras comodidades</p>
                                    <p className="text-sm text-gray-700">
                                        Si no encuentras una comodidad específica en la lista, ¡siéntete libre de agregarla tú mismo!
                                    </p>
                                </div>
                                <div className="grid grid-cols mb-5">

                                    {inputsAmenities.map((input, index) => (
                                        <div key={index} className="flex gap-2 items-center space-x-2 mb-2">
                                            <textarea
                                                value={input}
                                                onChange={(e) => handleInputChange(index, e.target.value)}
                                                className="border rounded-md px-2 py-1 w-full border-gray-300 bg-gray-100"
                                                rows={3} // Aquí puedes ajustar la altura de cada textarea según tus necesidades
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveInput(index)}
                                                className="bg-red-500  text-white px-2 py-1 rounded-md"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={handleAddInput}
                                        className="bg-blue-600 w-fit text-white px-2 py-1 rounded-md"
                                    >
                                        Agregar comodidad
                                    </button>
                                </div>

                            </div>

                            <footer className="fixed z-10 bottom-0 w-full border-t-gray-300 text-gray-600 bg-white border-t  border-gray-200  
                              shadow-lg shadow-gray-500 body-font">
                                <div className="px-2 md:px-10 py-5 flex justify-between items-center gap-3 flex-col-reverse md:flex-row">
                                    <div className="flex w-full flex-col-reverse md:flex-row items-center gap-2" >
                                        <button
                                            type="button"
                                            onClick={() => setModalSaveProcess(true)}
                                            className="bg-white w-full md:w-fit border border-black hover:bg-black hover:text-white text-black py-2 px-3 text-sm rounded-lg transition-all duration-300" >
                                            Guardar y salir
                                        </button>
                                        <button
                                            onClick={() => setstepsForm("representativeMotel")}
                                            className="bg-white text-black border border-black hover:bg-black hover:text-white w-full md:w-fit rounded-lg py-2 px-3 text-sm" >
                                            volver
                                        </button>
                                    </div>
                                    <button
                                        type='submit'
                                        disabled={showLoadingRegister}
                                        className={
                                            clsx(

                                                {
                                                    "flex w-full md:w-fit items-center gap-x-4 justify-center rounded-lg bg-red-600 px-3 py-2 hover:bg-red-700 text-sm text-white": !showLoadingRegister,
                                                    "flex w-full md:w-fit items-center gap-x-4 justify-center rounded-lg bg-red-600 px-3 py-2 text-sm text-white cursor-not-allowed": showLoadingRegister
                                                }
                                            )
                                        }>
                                        {
                                            showLoadingRegister &&
                                            (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>)
                                        }

                                        {
                                            showLoadingRegister
                                                ? (
                                                    <span>Cargando...</span>
                                                ) : (
                                                    <span>Continuar</span>
                                                )
                                        }

                                    </button>
                                </div>
                            </footer>
                        </form>
                    )
                }
            </div>

        </>
    )
}
