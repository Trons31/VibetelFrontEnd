"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./styles.module.css";
import { Navigation, Pagination } from "swiper/modules";
import { RoomImage } from "@/components";
import { IoMdClose } from "react-icons/io";

interface Props {
  images: string[];
  isOpen: boolean;
  initialIndex: number;
  onClose: () => void;
}

export const SlideShowImages = ({ images, initialIndex , isOpen, onClose }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen,initialIndex]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30 bg-black/80 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-black w-full h-screen flex flex-col items-center justify-center p-6">
        {/* Encabezado con índice y botón de cerrar */}
        <div className="w-full flex justify-between items-center px-1 md:px-14 mb-5">
          <p className="text-white text-sm">{currentIndex + 1} / {images.length}</p>
          <button
            onClick={onClose}
            className="group flex items-center gap-2 hover:text-black text-sm md:text-md text-white hover:bg-white px-2 py-1 rounded-lg transition-all duration-300"
          >
            <IoMdClose className="w-4 h-4 text-white group-hover:text-black" />
            Cerrar
          </button>
        </div>

        {/* Swiper centrado */}
        <Swiper
          navigation={true}
          initialSlide={initialIndex}
          modules={[Pagination, Navigation]}
          className="mySwiper w-full"
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          style={{
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className={styles["swiper-slide"]}>
              <div className="flex items-center justify-center h-full">
                <RoomImage
                  src={image}
                  width={800}
                  height={600}
                  alt={`Imagen ${index + 1}`}
                  className="object-cover max-h-[80vh] w-auto rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
