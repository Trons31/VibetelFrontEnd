import { RoomInService } from './RoomInService'
import { ReservationCompletionConfirmation } from './ReservationCompletionConfirmation'
import { Rooms } from './Rooms'

interface Props {
    motelId:string;
}

export const Tracker = ( {motelId}:Props ) => {


    
    return (
        <>
            <RoomInService motelId={motelId} />
            <ReservationCompletionConfirmation motelId={motelId}  />
            <Rooms motelId={motelId}/>
        </>
    )
}
