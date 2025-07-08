// Room Actions
export { paginationRoomByMotel } from './rooms/pagination-rooms-by-motel';
export { getBedroomBySlug } from './rooms/get-bedroom-by-slug';
export { getBedroomBySlugByMotel } from './rooms/get-bedroom-by-slug-by-motel';
export { getBedroomByMotel } from './rooms/get-bedroom-by-motel';
export { CreateUpdateRoom } from './rooms/create-update-room';
export { registerAmenitiesByRoom } from './rooms/register-amenities-by-room';
export { deleteRoomImage } from './rooms/delete-room-image';
export { getRoomBySearch } from './rooms/get-room-search';
export { disabledRoom } from './rooms/disabled-room';
export { enabledRoom } from './rooms/enabled-room';
export { addOrDeleteFavoriteRoom, inFavorites } from './rooms/add-to-favorite-room';
export { getRooms } from './rooms/get-rooms';
export { getRoomWithBestPromotion } from './rooms/getRoomWithBestPromotion';
export { getTopReservedRooms } from './rooms/getTopReservedRooms';
export { getRoomsInAvailableByMotel } from './rooms/get-rooms-inavailable-by-motel';
export { addRatingRoom } from './rooms/add-rating-room';
export { getRelatedRooms } from './rooms/get-related-rooms';
export { getRoomsByMotelManager } from './rooms/get-rooms-by-motel-Manager';
export { roomCleaning } from './rooms/room-cleaning';
export { getAllRoomByMotel } from './rooms/get-all-room-by-motel';
export { updatePriceRoomByMotel } from './rooms/update-price-room-by-motel';
export { updatePromotionByMotel } from './rooms/update-promotion-by-motel';

//Rating Actions
export { getExistingRating } from './rating/get-existing-rating';

// Auth Actions
export { login } from './auth/login';
export { logout } from './auth/logout';

// User Actions
export { updatePasswordByUser } from './user/update-password-by-user';
export { getFavoriteRoomByUser } from './user/get-favorite-room';
export { deleteFavoriteRoom } from './user/delete-favorite-room';
export { validateTokenResertPassword } from './user/validate-token-reset-password';
export { updateUser } from './user/update-user';

// Location Actions
export { GetCountries } from './country/get-country';
export { GetDepartment } from './department/get-department';
export { getCitiesByDepartment } from './city/get-cities-by-department';

// Category Room Actions
export { GetCategoryRoom } from './categoryRoom/category-room';
export { GetGarageRoom } from './garageRoom/get-garage-room';

// Amenities Room Actions
export { GetAmenitiesRoom } from './amenitiesRoom/get-amenitie-room';
export { GetAmenitiesByRoom } from './amenitiesRoom/get-amenitie-by-room';

// Amenities Motel Actions
export { getAmenitiesMotel } from './amenitiesMotel/get-amenities-motel';

// Motel Actions
export { registerMotelPartner } from './motels/register-motel-partner';
export { getMotelByMotelPartner } from './motels/get-motel-by-motelpartner';
export { registerRepresentativeLegal } from './motels/register-representative-legal';
export { registerMotel } from './motels/register-motel';
export { registerAmenitiesMotel } from './motels/register-amenities-motel';
export { registerImageMotel } from './motels/register-image-motel';
export { updateDataBasicMotel } from './motels/update-data-basic-motel';
export { updateLocationMotel } from './motels/update-location-motel';
export { createOrDeleteAmenitiesMotel } from './motels/create-or-delete-amenitie-motel';
export { updatePasswordMotel } from './motels/update-password-motel';
export { createOrDeleteOtherAmenities } from './motels/create-or-delete-other-amenities';
export { getConfigAdditionalSettingsMotel } from './motels/get-config-additional-settings-motel';
export { createAdditionalSettingsMotel } from './motels/create-additional-settings-motel';
export { getAllMotel } from './motels/get-all-motel';
export { getMotelBySlug } from './motels/get-motel-by-slug';
export { createUpdateBankMotel } from './motels/create-update-bank-motel';
export { getMotelInfoBySlug } from './motels/get-motel-info-slug';
export { getRoomInAviableByMotel } from './motels/get-room-in-aviable-by-motel';
export { getMostFrecuentedMotels } from './motels/get-most-frequented-motels';
export { updateInServiceMotel } from './motels/update-in-service-motel';



//Coverage Motel
export { coverageMotel } from './coverage-motel/coverage-motel';
export { createRequestCoverage } from './coverage-motel/create-request-coverage';

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

//Location
export { getLocationByUser } from './locationUser/get-location-by-user';
export { validateExistsMotelLocationUser } from './locationUser/validate-exists-motel-location-user';

//Search
export { getSuggestedRooms } from './search/get-suggested-rooms';
export { getSuggestedMotels } from './search/get-suggested-motels';
export { getSuggestedRoomsAndMotels } from './search/get-suggested-rooms-and-motel';


// Super Admin
export { getMotels } from './super-admin/get-motels';
export { updateStatusMotel } from './super-admin/update-status-motel';


//Bank
export { getAllBanks } from './bank/get-all-banks';
export { getAccountType } from './bank/get-account-type';
export { getBankAccountByMotel } from './bank/get-bank-account-by-motel';


export { getTransactionIdReservation } from './cookies/get-transaction-id-reservation';
export { getTransactionIdAddTimeReservation } from './cookies/get-transaction-id-add-time-reservation';
export { deleteTransactionIdReservation } from './cookies/delete-transaction-id-reservation';
export { getCookieCodeBookingAnonymous } from './cookies/set-get-cookie-code-booking-anonymous';
export { setCookieCodeBookingAnonymous } from './cookies/set-get-cookie-code-booking-anonymous';
export { deleteCookieCodeBookingAnonymous } from './cookies/delete-cookie-code-booking-anonymous';


export { serverTime } from './server/server-time';

export { serviceWalkIn } from './service/service-walk-in';
export { endServiceByMotel } from './service/end-service';
export { getServiceByMotel } from './service/get-service-by-motel';
export { getServiceById } from './service/get-service-by-id';
export { traficServiceToday } from './service/trafic-service-today';
export { getDataServicesGeneral } from './service/get-data-services-general';
export { getServiceByMotelToday } from './service/get-service-by-motel-today';
export { addTimeService } from './service/add-time-service';











