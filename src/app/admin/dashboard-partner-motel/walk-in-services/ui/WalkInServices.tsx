import { TableWalkIn } from './TableWalkIn'
import { DataGeneralOfService } from '@/components';
import { ServiceData } from '@/interfaces';
import { TableWalkInToday } from './TableWalkInToday';

interface Props {
    motelId: string;
    serviceDataToday: ServiceData;
    serviceData: ServiceData;
}

export const WalkInServices = ({ motelId, serviceDataToday, serviceData }: Props) => {
    return (
        <div className="">
            <div className="py-5">
                <div>
                    <DataGeneralOfService motelId={motelId} />
                </div>

                <div className='mt-10' >
                    <TableWalkInToday
                        motelId={motelId}
                        serviceDataToday={serviceDataToday}
                    />
                </div>

                <div className='mt-10' >
                    <TableWalkIn
                        motelId={motelId}
                        serviceData={serviceData}
                    />
                </div>
            </div>
        </div>
    )
}
