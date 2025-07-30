// Room Actions
export { registerAmenitiesByRoom } from './rooms/register-amenities-by-room';
export { disabledRoom } from './rooms/disabled-room';
export { enabledRoom } from './rooms/enabled-room';
export { addOrDeleteFavoriteRoom, inFavorites } from './rooms/add-to-favorite-room';
export { getTopReservedRooms } from './rooms/getTopReservedRooms';
export { getRoomsInAvailableByMotel } from './rooms/get-rooms-inavailable-by-motel';
export { addRatingRoom } from './rooms/add-rating-room';
export { getRoomsByMotelManager } from './rooms/get-rooms-by-motel-Manager';
export { roomCleaning } from './rooms/room-cleaning';
export { updatePriceRoomByMotel } from './rooms/update-price-room-by-motel';
export { updatePromotionByMotel } from './rooms/update-promotion-by-motel';

//Rating Actions
export { getExistingRating } from './rating/get-existing-rating';

// Auth Actions
export { login } from './auth/login';
export { logout } from './auth/logout';

// User Actions
export { updateUser } from './user/update-user';

// Amenities Motel Actions
export { getAmenitiesMotel } from './amenitiesMotel/get-amenities-motel';

// Motel Actions
export { getMotelByMotelPartner } from './motels/get-motel-by-motelpartner';
export { registerAmenitiesMotel } from './motels/register-amenities-motel';
export { updateDataBasicMotel } from './motels/update-data-basic-motel';
export { updateLocationMotel } from './motels/update-location-motel';
export { createOrDeleteAmenitiesMotel } from './motels/create-or-delete-amenitie-motel';
export { updatePasswordMotel } from './motels/update-password-motel';
export { createOrDeleteOtherAmenities } from './motels/create-or-delete-other-amenities';
export { getRoomInAviableByMotel } from './motels/get-room-in-aviable-by-motel';
export { getMostFrecuentedMotels } from './motels/get-most-frequented-motels';
export { updateInServiceMotel } from './motels/update-in-service-motel';



//Data for initial Page
export { getDataForInformation } from './initialPage/get-data-for-information';

//Reservations Actions
export { placeReservation } from './reservation/place-reservation';
export { getReservationByUser } from './reservation/get-reservation-by-user';
export { getReservationById } from './reservation/get-reservation-by-id';
export { validateDateReservation } from './reservation/validate- date-reservation';
export { canceledReservationByUser } from './reservation/canceled-reservation-by-user';
export { traficReservationToday } from './reservation/trafic-reservation-today';
export { getReservationInRealTime } from './reservation/get-reservation-in-real-time';
export { searchAccessCode } from './reservation/access-code';
export { reservationCheckIn } from './reservation/reservation-check-in';
export { confirmTakeReservation } from './reservation/confirm-take-reservation';
export { getReservationsByMotel } from './reservation/get-reservation-by-motel';
export { getTodayReservationsByMotel } from './reservation/get-reservation-today-by-motel';
export { getTotalReservationTodayByMotel } from './reservation/get-total-reservation-today';
export { getTotalReservationByMotel } from './reservation/get-total-reservations-by-motel';
export { confirmCompletedReservationByUser, confirmCompletedReservationByMotel } from './reservation/confirm-completed-reservation';
export { addTimeReservation } from './reservation/add-time-reservation';
export { getAddTimeReservationById } from './reservation/get-add-time-reservation-by-id';
export { getReservationByRoom } from './reservation/get-reservation-by-room';
export { getReservationByRoomId } from './reservation/get-reservation-by-roomid';
export { getReservationByTransactionId } from './reservation/get-reservation-by-transactionId';
export { getAddTimeReservationByTransactionId } from './reservation/get-add-time-reservation-by-transactionId';


//Sheed Admin
export { roomInServiceAdmin } from './sheet-admin/room-in-service';
export { getReservationConfirmCompleted } from './sheet-admin/get-reservation-confirm-completed';
export { detailRoomInService } from './sheet-admin/detail-room-in-service';



export { getTransactionIdAddTimeReservation } from './cookies/get-transaction-id-add-time-reservation';

export { serverTime } from './server/server-time';

export { serviceWalkIn } from './service/service-walk-in';
export { endServiceByMotel } from './service/end-service';
export { getServiceByMotel } from './service/get-service-by-motel';
export { getServiceById } from './service/get-service-by-id';
export { traficServiceToday } from './service/trafic-service-today';
export { getDataServicesGeneral } from './service/get-data-services-general';
export { getServiceByMotelToday } from './service/get-service-by-motel-today';
export { addTimeService } from './service/add-time-service';











