'use client';
import React, { useEffect, useState } from 'react'
import { MotelApi } from '@/interfaces';
import toast, { Toaster } from 'react-hot-toast';
import clsx from 'clsx';

interface Props {
    motel: MotelApi;
}

export const OtherAmenities = ({ motel }: Props) => {

    const [inputsAmenities, setInputs] = useState<string[]>(motel.amenities);
    const [showMessageErrorAmenities, setShowMessageErrorAmenities] = useState(false);
    const [loading, setLoading] = useState(true);
    const [motelInfo, setMotelInfo] = useState<MotelApi>();
    const [showLoadingButton, setShowLoadingButton] = useState(false);


    const onUpdateAmenities = async () => {
        setShowLoadingButton(true);
        const isEmpty = inputsAmenities.some(input => input.trim() === "");
        if (isEmpty) {
            setShowMessageErrorAmenities(true);
            setShowLoadingButton(false);
            return;
        }

        // const response = await createOrDeleteOtherAmenities(motel.id, inputsAmenities);
        // if (!response.ok) {
        //     toast.error("No se pudo actualizar la informacion")
        //     setShowLoadingButton(false);
        //     return;
        // }

        toast.success("Actualizacion correcta!")
        setShowLoadingButton(false);


    }

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

    useEffect(() => {
        setMotelInfo(motel);
        setLoading(false)
    }, [motelInfo, motel]);

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            {
                loading
                    ?
                    (
                        <>
                            <div className=" flex w-full h-fit items-center gap-3 py-2 rounded-md ">
                                <div className="w-full h-10 mb-2 bg-gray-300 rounded-md animate-pulse"></div>
                                <div className="w-24 h-3 mb-2 bg-gray-300 rounded-full animate-pulse"></div>
                            </div>
                            <div className=" flex w-full h-fit items-center gap-3 py-2 rounded-md ">
                                <div className="w-full h-10 mb-2 bg-gray-300 rounded-md animate-pulse"></div>
                                <div className="w-24 h-3 mb-2 bg-gray-300 rounded-full animate-pulse"></div>
                            </div>
                            <div className=" flex w-full h-fit items-center gap-3 py-2 rounded-md ">
                                <div className="w-full h-10 mb-2 bg-gray-300 rounded-md animate-pulse"></div>
                                <div className="w-24 h-3 mb-2 bg-gray-300 rounded-full animate-pulse"></div>
                            </div>
                        </>
                    )
                    : (
                        <>

                            {inputsAmenities.map((input, index) => (
                                <div key={index} className="flex gap-2 items-center space-x-2 mb-2">
                                    <textarea
                                        value={input}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        className="border text-xs md:text-sm rounded-md px-2 py-1 w-full border-gray-300 bg-gray-100"
                                        placeholder="ej: Nombre de la comodidad"
                                        rows={2}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveInput(index)}
                                        className="bg-red-500 text-xs md:text-sm text-white px-2 py-1 rounded-md"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                            <div className='grid grid-cols' >

                                {
                                    showMessageErrorAmenities &&
                                    (
                                        <span className="text-red-500 py-2 text-xs">* Existe un campo/s vacio.</span>
                                    )
                                }

                                <button
                                    type="button"
                                    onClick={handleAddInput}
                                    className="bg-blue-600 text-xs md:text-sm w-fit text-white px-2 py-1 rounded-md"
                                >
                                    Agregar comodida
                                </button>

                            </div>


                            <div className='flex mt-5 md:mt-0 md:justify-end'>

                                <button
                                    type='submit'
                                    onClick={onUpdateAmenities}
                                    disabled={showLoadingButton}
                                    className={
                                        clsx(

                                            {
                                                "flex justify-center w-full md:w-fit text-xs md:text-sm items-center gap-x-4 rounded-lg bg-blue-600 hover:bg-blue-700 px-7 py-2 font-medium text-white": !showLoadingButton,
                                                "flex justify-center w-full md:w-fit text-xs md:text-sm items-center gap-x-4 rounded-lg bg-blue-600 px-7 py-2 font-medium text-white cursor-not-allowed": showLoadingButton
                                            }
                                        )
                                    }>
                                    {
                                        showLoadingButton &&
                                        (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>)
                                    }

                                    {
                                        showLoadingButton
                                            ? (
                                                <span>Cargando...</span>
                                            ) : (
                                                <span>Actualizar</span>
                                            )
                                    }

                                </button>

                            </div>
                        </>
                    )
            }

        </>
    )
}
