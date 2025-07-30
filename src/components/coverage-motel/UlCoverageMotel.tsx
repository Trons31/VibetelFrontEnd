import React from 'react'
import { CoverageDepartmentApi } from '@/interfaces'
import { ItemCoverageMotel } from './ItemCoverageMotel'
import clsx from 'clsx'

interface Props {
    departments: CoverageDepartmentApi[]
}

export const UlCoverageMotel = ({ departments }: Props) => {

    return (
        <div className={
            clsx(
                {
                    "grid grid-cols md:grid-cols-2 p-2 md:p-10 gap-4 md:gap-10": departments.length > 1,
                    "grid grid-cols p-2 md:p-10 gap-4 md:gap-10": departments.length === 1
                }
            )
        } >
            {
                departments.map(department => (
                    <ItemCoverageMotel
                        key={department.departmentId}
                        department={department}
                    />
                ))
            }
        </div>
    )
}
