'use client';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import clsx from 'clsx';
import axios from 'axios';

interface Props {
    accessToken: string;
}

export const OtherAmenities = ({ accessToken }: Props) => {

    const [inputsAmenities, setInputs] = useState<{ name: string; description: string }[]>([]);
    const [showMessageErrorAmenities, setShowMessageErrorAmenities] = useState(false);
    const [showLoadingButton, setShowLoadingButton] = useState(false);


    const onUpdateAmenities = async () => {
        setShowLoadingButton(true);

        const isEmpty = inputsAmenities.some(input => input.name.trim() === "" || input.description.trim() === "");
        if (isEmpty) {
            setShowMessageErrorAmenities(true);
            setShowLoadingButton(false);
            return;
        }

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_ROUTE}motel/amenities/create`,
                {
                    amenities: inputsAmenities,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            toast.success("Actualizacion correcta!")
            setShowLoadingButton(false);
        } catch (error: any) {
            toast.error("No se pudo actualizar la informacion")
            setShowLoadingButton(false);
            return;
        }


    };

    const handleInputChange = (index: number, field: 'name' | 'description', value: string) => {
        const newInputs = [...inputsAmenities];
        newInputs[index][field] = value;
        setInputs(newInputs);
    };

    const handleAddInput = () => {
        setInputs([...inputsAmenities, { name: '', description: '' }]);
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



            {inputsAmenities.map((input, index) => (
                <div key={index} className="flex gap-2 items-start space-x-2 mb-2">
                    <div className='w-full' >
                        <div className="mb-4 w-fit">
                            <label className="block mb-2 text-sm text-black font-semibold ">Nombre de la comodidad</label>
                            <input
                                value={input.name}
                                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                type="text"
                                className="bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black" placeholder=""
                            />
                        </div>


                        <div className="mb-4 w-ful">
                            <label className="block mb-2 text-sm text-black font-semibold ">Descripcion de la comodidad</label>
                            <textarea
                                value={input.description}
                                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                className="border text-xs md:text-sm rounded-md px-2 py-1 w-full border-gray-300 bg-gray-100"
                                placeholder="ej: Descripcion de la comodidad"
                                rows={2}
                            />
                        </div>
                    </div>
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
