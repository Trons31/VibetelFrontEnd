'use client';
import { ModalForm } from '@/components';
import { UserInterface } from '@/interfaces/user.interface';
import React, { useState } from 'react'

interface Props{
    user: UserInterface
}

export const ModalUpdate = ({user}:Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="ml-auto inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Actualizar</button>
            <ModalForm
                user={user}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}
