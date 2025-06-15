import { DataGeneralOfReservation, ReservationRealTime } from '@/components';
import { TableReservation } from './TableReservation';
import { ReservationData } from '@/interfaces/reservation.interface';
import { TodayTableReservation } from './TodayTableReservation';


interface Props {
  motelId: string;
  reservationData: ReservationData;
}

export const BookingPage = ({ motelId, reservationData }: Props) => {
  return (
    <div className="">
      <div className="py-5">
        <div className='grid grid-cols-1  md:grid-cols-12 gap-2'>
          <div className='h-fit md:col-span-5'>
            <DataGeneralOfReservation motelId={motelId} />
          </div>
          <div className='h-fit w-full md:col-span-7'>
            <ReservationRealTime motelId={motelId} />
          </div>
        </div>

        <div className='mt-10' >
          <TodayTableReservation
            motelId={motelId}
            totalReservation={reservationData}
          />
        </div>

        <div className='mt-10' >
          <TableReservation
            motelId={motelId}
            totalReservation={reservationData}
          />
        </div>

      </div>
    </div>
  )
}
