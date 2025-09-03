'use client';

import { CityApi, DepartmentApi } from '@/interfaces';
import { sleep } from '@/utils';
import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface FormInputs {
  name: string;
  departmentGeonameId: string;
}

interface Props {
  city?: CityApi;
  departments: DepartmentApi[];
  accessToken: string;
  mode: 'create' | 'update';
  isOpen: boolean;
  onClose: () => void;
}

export const ModalRegisterCity = ({
  city,
  departments,
  accessToken,
  mode,
  isOpen,
  onClose,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);


  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      name: city?.name ?? '',
      departmentGeonameId: city?.department?.geonameId ?? '',
    },
  });

  useEffect(() => {
    reset({
      name: city?.name ?? '',
      departmentGeonameId: city?.department?.geonameId ?? '',
    });
  }, [city, reset]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const orderedDepartments = useMemo(
    () => [...departments].sort((a, b) => a.name.localeCompare(b.name)),
    [departments]
  );

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    try {
      if (mode === 'create') {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_ROUTE}locations/cities`,
          { name: data.name, departmentGeonameId: data.departmentGeonameId },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        toast.success('Ciudad creada correctamente');
      } else {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_ROUTE}locations/cities/${city?.id}`,
          { name: data.name, departmentGeonameId: data.departmentGeonameId },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        toast.success('Ciudad actualizada correctamente');
      }

      setIsLoading(false);
      onClose();
      sleep(2);
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error('No se pudo guardar la ciudad');
      setIsLoading(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-hidden flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white md:rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 p-6 max-h-full overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          {mode === 'create' ? 'Registrar ciudad' : 'Actualizar ciudad'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid px-2 grid-cols-1 mt-5 sm:px-0 gap-6">
            <div>
              <label className={clsx('block mb-2 text-sm text-black font-semibold', { 'text-red-500': errors.name })}>
                Nombre
              </label>
              <input
                type="text"
                className={clsx(
                  'bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black',
                  { 'border-red-500': errors.name }
                )}
                {...register('name', { required: true, minLength: 2 })}
                placeholder="Antioquia"
              />
              {errors.name && <span className="text-red-500 text-sm">* El nombre es obligatorio</span>}
            </div>

            <div>
              <label className={clsx('block mb-2 text-sm text-black font-semibold', { 'text-red-500': errors.departmentGeonameId })}>
                Departamento
              </label>
              <select
                className={clsx(
                  'bg-white border-2 border-gray-300 text-black text-sm rounded-lg focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5',
                  { 'border-red-500': errors.departmentGeonameId }
                )}
                {...register("departmentGeonameId", { required: true })}
              >
                <option value="">Selecciona un departamento</option>
                {orderedDepartments.map((c) => (
                  <option key={c.geonameId} value={c.geonameId}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.departmentGeonameId && <span className="text-red-500 text-sm">* Debes seleccionar un departamento</span>}
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mt-4 text-xs md:text-base bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Cerrar
            </button>
            <button
              className={clsx(
                'mt-4 px-4 py-2 rounded text-xs md:text-base text-white',
                isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              )}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : mode === 'create' ? 'Registrar' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
