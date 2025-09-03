'use client';

import { CountryApi, DepartmentApi } from '@/interfaces';
import { sleep } from '@/utils';
import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface FormInputs {
  name: string;
  countryGeonameId: string;
}

interface Props {
  department?: DepartmentApi;
  countries: CountryApi[];
  accessToken: string;
  mode: 'create' | 'update';
  isOpen: boolean;
  onClose: () => void;
}

export const ModalRegisterDepartment = ({
  department,
  countries,
  accessToken,
  mode,
  isOpen,
  onClose,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const normalizeName = (name: string): string =>
    name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '_');

  const generateGeonameId = (name: string): string => {
    const base = normalizeName(name);
    return `${base}_${Date.now()}`;
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      name: department?.name ?? '',
      countryGeonameId: department?.country?.geonameId ?? '',
    },
  });

  useEffect(() => {
    reset({
      name: department?.name ?? '',
      countryGeonameId: department?.country?.geonameId ?? '',
    });
  }, [department, reset]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const orderedCountries = useMemo(
    () => [...countries].sort((a, b) => a.name.localeCompare(b.name)),
    [countries]
  );

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    try {
      if (mode === 'create') {
        const payload = {
          geonameId: generateGeonameId(data.name),
          name: data.name,
          countryGeonameId: data.countryGeonameId,
        };

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_ROUTE}locations/departments`,
          payload,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        toast.success('Departamento creado correctamente');
      } else {
        const payload = {
          name: data.name,
          countryGeonameId: data.countryGeonameId, // opcional: solo si cambió
        };

        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_ROUTE}locations/departments/${department?.geonameId}`,
          payload,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        toast.success('Departamento actualizado correctamente');
      }

      setIsLoading(false);
      onClose();
      sleep(2);
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error('No se pudo guardar el departamento');
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
          {mode === 'create' ? 'Registrar departamento' : 'Actualizar departamento'}
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
              <label className={clsx('block mb-2 text-sm text-black font-semibold', { 'text-red-500': errors.countryGeonameId })}>
                País
              </label>
              <select
                className={clsx(
                  'bg-white border-2 border-gray-300 text-black text-sm rounded-lg focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5',
                  { 'border-red-500': errors.countryGeonameId }
                )}
                {...register('countryGeonameId', { required: true })}
              >
                <option value="">Selecciona un país</option>
                {orderedCountries.map((c) => (
                  <option key={c.geonameId} value={c.geonameId}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.countryGeonameId && (
                <span className="text-red-500 text-sm">* Debes seleccionar un país</span>
              )}
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
