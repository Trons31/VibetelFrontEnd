
import type { BedroomBooking } from "@/interfaces";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    Booking: BedroomBooking | null;
    isLoading: boolean,
    tokenExpire: boolean,
    getInformationSummary: () => {
        price: number;
        promPrice?: number;
        total: number;
        bedroom: string;
        motel: string;
        arrivalDate: Date;
        departureDate: Date;
    };
    addBedroomToBooking: (bedroom: BedroomBooking) => void;
    removeBooking: () => void;
    updateDate: (bedroom: BedroomBooking, date: Date) => void;
    setTokenExpire: (value: boolean) => void;
    finishLoading: () => void;
}

export const useBookingStore = create<State>()(
    persist(
        (set, get) => ({
            Booking: null,
            isLoading: true,
            tokenExpire: false,
            // Methods

            getInformationSummary: () => {
                const { Booking } = get();

                if (Booking) {
                    const price = Booking.promoActive ? (Booking.promoprice! || 0) : (Booking.price || 0);
                    const total = Booking.promoActive ? (Booking.promoprice! + Booking.extraServices! || 0) : (Booking.price + Booking.extraServices! || 0);
                    const bedroom = Booking.title;
                    const motel = Booking.motel.title;
                    const arrivalDate = Booking.arrivalDate;
                    const departureDate = Booking.departureDate;
                    return {
                        price, total, bedroom, motel, arrivalDate, departureDate
                    };
                }

                return {
                    price: 0,
                    total: 0,
                    bedroom: '',
                    motel: '',
                    arrivalDate: new Date(),
                    departureDate: new Date()
                };
            },

            addBedroomToBooking: (bedroom: BedroomBooking) => {
                const { Booking } = get();

                const bedroomInBooking = Booking?.id === bedroom.id;

                if (!bedroomInBooking) {
                    set({ Booking: bedroom });
                    return;
                }

                if (Booking.id !== bedroom.id) {
                    // Reemplazar la reserva existente con la nueva
                    set({ Booking: bedroom });
                    return;
                }

                set({ Booking: bedroom });
            },

            removeBooking: async () => {
                set({ Booking: null });
            },

            setTokenExpire: (value) => set({ tokenExpire: value }),

            updateDate: (bedroom: BedroomBooking, date: Date) => {
                const { Booking } = get();

                if (Booking && Booking.id === bedroom.id) {
                    const departureDate = new Date(Booking.arrivalDate);
                    departureDate.setHours(Booking.arrivalDate.getHours() + bedroom.timeLimit);
                    departureDate.setMinutes(Booking.arrivalDate.getMinutes());

                    if (departureDate.getHours() < 2) {
                        departureDate.setDate(Booking.arrivalDate.getDate() + 1);
                    }
                    const updatedBooking = {
                        ...Booking,
                        arrivalDate: date,
                        departureDate: departureDate
                    };
                    set({ Booking: updatedBooking });
                }
            },

            finishLoading: () => {
                set({ isLoading: false });
            },
        }),
        {
            name: 'booking-bedroom',

        }
    )
);
