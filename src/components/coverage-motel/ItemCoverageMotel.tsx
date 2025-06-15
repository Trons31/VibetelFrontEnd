'use client';
import React, { useState } from 'react'
import { CoverageDepartment } from '@/interfaces';
import { FaCircleCheck } from 'react-icons/fa6'
import { ModalRequestCoverage } from '@/components';

interface Props {
    department: CoverageDepartment;
}

export const ItemCoverageMotel = ({ department }: Props) => {
    const [isModalRequestCoverage, setIsModalRequestCoverage] = useState(false)

    const [selectedCityModalRequest, setSelectedCityModalRequest] = useState("");
    const [selectedCityIdModalRequest, setSelectedCityIdModalRequest] = useState("");
    const [selectedDepartmentRequest, setSelectedDepartmentRequest] = useState("");

    const onSelectedRequestLocation = (city: string, cityId: string, department: string) => {
        setSelectedCityModalRequest(city);
        setSelectedCityIdModalRequest(cityId)
        setSelectedDepartmentRequest(department);
        setIsModalRequestCoverage(true);
    }

    return (
        <>
            <ModalRequestCoverage
                department={selectedDepartmentRequest}
                city={selectedCityModalRequest}
                cityId={selectedCityIdModalRequest}
                isOpen={isModalRequestCoverage}
                onClose={() => setIsModalRequestCoverage(false)}
            />

            <div className='mb-10 border border-gray-200 rounded-3xl p-6' >

                <div>
                    <div className='flex justify-between items-center mb-2' >
                        <h2 className="text-xl font-bold text-gray-800">{department.departmentName}</h2>
                        {
                            department.totalApprovedMotelsInDepartment > 0
                                ? (
                                    <div className="center rounded-full bg-green-500 py-1 px-3 text-xs font-medium text-white">
                                        <div className="mt-px ">Tenemos cobertura</div>
                                    </div>
                                ) : (
                                    department.totalUnapprovedMotelsInDepartment > 0
                                        ? (
                                            <div className="center rounded-full bg-purple-600-500 py-1 px-3  text-xs font-medium text-white">
                                                <div>Proximamente</div>
                                            </div>
                                        ) : (
                                            <div className="center rounded-full bg-red-500 py-2 px-3 text-xs font-medium text-white">
                                                <div> No tenemos cobertura</div>
                                            </div>
                                        )
                                )
                        }
                    </div>

                    {
                        department.totalApprovedMotelsInDepartment > 0
                            ? (
                                <div className="block md:flex items-center gap-3 mt-3 ">
                                    <div className="flex items-center text-sm text-gray-600 gap-2 lg:justify-start">
                                        <FaCircleCheck size={15} className="text-green-500" />
                                        {
                                            department.totalApprovedMotelsInDepartment > 1
                                                ? `Mas de ${department.totalApprovedMotelsInDepartment - 1}  moteles asociados`
                                                : `${department.totalApprovedMotelsInDepartment} motel asociado`
                                        }
                                    </div>
                                    <li className="flex items-center text-sm text-gray-600 gap-2 lg:justify-start">
                                        <FaCircleCheck size={15} className="text-green-500" />
                                        {
                                            department.totalApprovedMotelsInDepartment > 1
                                                ? `Presentes en mas de ${department.totalApprovedMotelsInDepartment - 1} ciudades`
                                                : `Presentes en ${department.totalApprovedMotelsInDepartment} ciudad`
                                        }
                                    </li>
                                </div>
                            ) : (
                                department.totalUnapprovedMotelsInDepartment > 0
                                    ? (
                                        <p className='text-gray-500 text-sm' style={{ textAlign: 'justify' }}>
                                            Actualmente no contamos con cobertura en <span className='font-semibold'>{department.departmentName}</span>, pero tenemos moteles registrados que proximamente entraran en operacion.
                                        </p>
                                    ) : (
                                        <p className='text-gray-500 text-sm' style={{ textAlign: 'justify' }}>
                                            Actualmente no contamos con cobertura en <span className='font-semibold'>{department.departmentName}</span>, pero pronto estaremos llegando para brindarte nuestro servicio.
                                        </p>
                                    )
                            )
                    }
                </div>

                <div className="w-full text-gray-600 mt-4">
                    <p className="mb-1 underline text-sm font-semibold">Estamos ubicados</p>
                    <ul className="mt-2 space-y-1 " >
                        {
                            department.cityDetails.map(cityDetails => (
                                <li
                                    key={cityDetails.cityId}
                                    className="grid grid-cols md:grid-cols-3  items-center p-2 rounded-md hover:bg-gray-200"
                                >
                                    <div className='flex  md:hidden justify-start' >
                                        <p className="font-extralight text-md">{cityDetails.cityName}</p>
                                    </div>
                                    <div className='flex md:hidden flex-wrap justify-between' >

                                        {cityDetails.totalApprovedMotelsInCity > 0 ? (
                                            <p className="text-sm text-green-600">Disponible</p>
                                        ) : (
                                            cityDetails.totalUnapprovedMotelsInCity > 0
                                                ? (
                                                    <p className="text-sm text-purple-600">Proximamente</p>
                                                ) : (
                                                    <p className="text-sm text-red-600">No disponible</p>
                                                )
                                        )}

                                        {cityDetails.totalApprovedMotelsInCity > 0 ? (
                                            <p className="text-gray-500 text-sm underline">
                                                {cityDetails.totalApprovedMotelsInCity} moteles operando
                                            </p>
                                        ) : (
                                            cityDetails.totalUnapprovedMotelsInCity > 0
                                                ? (
                                                    <p className="text-gray-500 text-sm underline">Proximamente</p>
                                                ) : (
                                                    <button
                                                        onClick={() => onSelectedRequestLocation(cityDetails.cityName, cityDetails.cityId, department.departmentName)}
                                                        className="underline text-sm cursor-pointer">Mas informacion</button>
                                                )
                                        )}
                                    </div>
                                    <div className='hidden md:flex justify-start' >
                                        <p className="font-extralight text-md">{cityDetails.cityName}</p>
                                    </div>
                                    <div className='hidden md:flex' >
                                        {cityDetails.totalApprovedMotelsInCity > 0 ? (
                                            <p className="text-sm text-green-600">Disponible</p>
                                        ) : (
                                            cityDetails.totalUnapprovedMotelsInCity > 0
                                                ? (
                                                    <p className="text-sm text-purple-600">Proximamente</p>
                                                ) : (
                                                    <p className="text-sm text-red-600">No disponible</p>
                                                )
                                        )}
                                    </div>
                                    <div className='hidden md:flex' >
                                        {cityDetails.totalApprovedMotelsInCity > 0 ? (
                                            <p className="text-gray-500 text-sm underline">
                                                {cityDetails.totalApprovedMotelsInCity} moteles operando
                                            </p>
                                        ) : (
                                            cityDetails.totalUnapprovedMotelsInCity > 0
                                                ? (
                                                    <p className="text-gray-500 text-sm underline">Proximamente</p>
                                                ) : (
                                                    <button
                                                        onClick={() => onSelectedRequestLocation(cityDetails.cityName, cityDetails.cityId, department.departmentName)}
                                                        className="underline text-sm cursor-pointer">Mas informacion</button>
                                                )
                                        )}
                                    </div>

                                </li>

                            ))
                        }
                    </ul>
                </div>


            </div>
        </>
    )
}
