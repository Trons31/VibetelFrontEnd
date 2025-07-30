"use client";

import React, { useState } from 'react'
import { AccountTypeApi, BankAccountApi, BankApi } from '@/interfaces';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';


type FormInputs = {
  bankId: string;
  accountTypeId: string;
  accountHolderName: string;
  accountHolderId: string;
  accountNumber: string;
}

interface Props {
  bank: BankApi[];
  accountType: AccountTypeApi[];
  bankAccount: BankAccountApi | null;
  accessToken: string;
}

export const BankAccountForm = ({ accountType, bank, bankAccount, accessToken }: Props) => {

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { isValid, errors }
  } = useForm<FormInputs>({
    defaultValues: {
      accountHolderId: bankAccount?.accountHolderId,
      accountHolderName: bankAccount?.accountHolderName,
      accountNumber: bankAccount?.accountNumber,
      accountTypeId: bankAccount?.accountTypeId,
      bankId: bankAccount?.bankId
    }
  });

  const OnSubmit = async (data: FormInputs) => {
    setIsLoading(true);

    if (bankAccount) {
      try {
        await axios.patch(`${process.env.NEXT_PUBLIC_API_ROUTE}bank-accounts`, data,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        toast.success("Actualizacion correcta!");
        setIsLoading(false);
      } catch (error: any) {
        toast.error("No se pudo actualizar la informacion")
        setIsLoading(false);
        return;
      }
    } else {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}bank-accounts`, data,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        toast.success("Cuenta bancaria registrada correctamente!");
        setIsLoading(false);
      } catch (error: any) {
        toast.error("No se pudo guardar la informacion")
        setIsLoading(false);
        return;
      }
    }

  }

  return (
    <>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <form onSubmit={handleSubmit(OnSubmit)}  >

        <div className='grid mt-10 grid-cols-1 sm:grid-cols-2 gap-6' >
          <div className="flex flex-col md:mb-4">
            <div className="flex mb-2 items-center gap-3" >
              <label className={
                clsx(
                  "block  text-sm text-black font-semibold ",
                  {
                    "text-red-500": errors.bankId
                  }
                )
              }>Banco</label>
            </div>
            <select className={
              clsx(
                "bg-gray-50  border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 border-2 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                {
                  'focus:border-red-600 border-red-500': errors.bankId
                }
              )
            }
              {...register('bankId', { required: true })}
            >
              <option value="">[Seleccione]</option>
              {
                bank.map(bankMap => (
                  <option key={bankMap.id} value={bankMap.id}> {bankMap.name} </option>
                ))
              }
            </select>
            {
              errors.bankId?.type === 'required' && (
                <span className="text-red-500 text-xs">* Seleccione un banco</span>
              )
            }
            <span className="text-xs text-gray-500 block">
              Por favor, asigne una categoría de acuerdo a la información seleccionada. Si tiene alguna duda, consulte la información de cada categoría.
            </span>
          </div>

          <div className="flex flex-col mb-6 md:mb-4">
            <div className="flex mb-2 items-center gap-3" >
              <label className={
                clsx(
                  "block  text-sm text-black font-semibold ",
                  {
                    "text-red-500": errors.accountTypeId
                  }
                )
              }>Tipo de cuenta</label>
            </div>
            <select className={
              clsx(
                "bg-gray-50  border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 border-2 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                {
                  'focus:border-red-600 border-red-500': errors.accountTypeId
                }
              )
            }
              {...register('accountTypeId', { required: true })}
            >
              <option value="">[Seleccione]</option>
              {
                accountType.map(accountTypeMap => (
                  <option key={accountTypeMap.id} value={accountTypeMap.id}> {accountTypeMap.name} </option>
                ))
              }
            </select>
            {
              errors.accountTypeId?.type === 'required' && (
                <span className="text-red-500 text-xs">* Seleccione un tipo de cuenta</span>
              )
            }
          </div>
        </div>

        <div className="mb-7 md:mb-7" >
          <div>
            <label className={
              clsx(
                "block mb-2 text-sm text-black font-semibold ",
                {
                  "text-red-500": errors.accountNumber
                }
              )
            }>Numero de cuenta</label>
            <input type="text" className={
              clsx(
                "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                {
                  'focus:border-red-600 border-red-500': errors.accountNumber
                }
              )
            } placeholder="ej: xxxx xxxx xxxx xxxx"
              {...register('accountNumber', { required: true })}
            />
            {
              errors.accountNumber?.type === 'required' && (
                <span className="text-red-500 text-xs" >* El numero de cuenta es oblogatorio</span>
              )
            }
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:gap-6' >
          <div className="mb-6 md:mb-4">
            <label className={
              clsx(
                "block mb-2 text-sm text-black font-semibold ",
                {
                  "text-red-500": errors.accountHolderName
                }
              )
            }>Nombre del titular</label>
            <input type="text" className={
              clsx(
                "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                {
                  'focus:border-red-600 border-red-500': errors.accountHolderName
                }
              )
            } placeholder="ej: Daniel Rivero"
              {...register('accountHolderName', { required: true })}
            />
            {
              errors.accountHolderName?.type === 'required' && (
                <span className="text-red-500 text-xs" >* El nombre del titular es oblogatorio</span>
              )
            }
          </div>

          <div className="mb-4">
            <label className={
              clsx(
                "block mb-2 text-sm text-black font-semibold ",
                {
                  "text-red-500": errors.accountHolderId
                }
              )
            }>Numero de documento del titular</label>
            <input type="text" className={
              clsx(
                "bg-gray-300 border-2 border-gray-300 text-black text-sm rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 block w-full p-2.5 placeholder-black",
                {
                  'focus:border-red-600 border-red-500': errors.accountHolderId
                }
              )
            } placeholder="ej: xxxxxxxxxx"
              {...register('accountHolderId', { required: true })}
            />
            {
              errors.accountHolderId?.type === 'required' && (
                <span className="text-red-500 text-xs" >* El numero de documento del titular es oblogatorio</span>
              )
            }
          </div>
        </div>

        <div className='flex mt-3 md:mt-0 md:justify-end' >
          <button
            type='submit'
            disabled={isLoading}
            className={
              clsx(

                {
                  "flex w-full md:w-fit items-center gap-x-4 rounded-lg bg-gray-300 hover:bg-gray-400 px-7 py-2 font-medium text-gray-600 transition-all duration-300": !isLoading && !bankAccount,
                  "flex w-full md:w-fit items-center gap-x-4 rounded-lg bg-blue-600 hover:bg-blue-700 px-7 py-2 font-medium text-white": !isLoading && bankAccount,
                  "flex w-full md:w-fit items-center gap-x-4 rounded-lg bg-gray-300 px-7 py-2 font-medium text-gray-600 cursor-not-allowed": isLoading
                }
              )
            }>
            {
              isLoading &&
              (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>)
            }

            {
              isLoading
                ? (
                  <span>Cargando...</span>
                ) : (
                  bankAccount
                    ? <span>Actualizar informacion</span>
                    : <span>Mandar aprobacion</span>
                )
            }

          </button>
        </div>
      </form >

    </>
  )
}
