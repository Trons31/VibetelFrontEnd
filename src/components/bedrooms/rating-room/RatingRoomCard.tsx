"use client";

import { FaStar, FaStarHalfAlt } from "react-icons/fa";

interface Rating {
  rating: number;
}

interface Props {
  ratings: Rating[];
}

export const RatingRoomCard = ({ ratings }: Props) => {
  const averageRating =
    ratings.length > 0
      ? (
        ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
      ).toFixed(1)
      : "0.0";

  return (
    <>
      <button className="flex gap-1 items-center">
        <div className="flex items-center">
          <FaStar
            className="text-gray-900 w-3 h-3 md:w-3.5 md:h-3.5 ms-1"
          />
        </div>
        <p className="font-extralight text-xs md:text-sm mt-0.5 ">
          {averageRating}
        </p>
      </button>
    </>
  );
};
