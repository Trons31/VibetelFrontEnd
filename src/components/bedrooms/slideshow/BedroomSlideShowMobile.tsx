"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./slideshow.module.css";
// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { RoomImage, SlideShowImages } from "@/components";
import { useState } from "react";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const BedroomSlideShowMobile = ({ images, title, className }: Props) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const openModal = (index: number) => {
    setStartIndex(index);
    setShowAllImages(true);
  };

  return (
    <>
      <SlideShowImages
        images={images}
        initialIndex={startIndex}
        isOpen={showAllImages}
        onClose={() => setShowAllImages(false)}
      />

      <div className={className}>
        <Swiper
          style={{
            height: "350px",
          }}
          autoplay={{
            delay: 2500,
          }}
          navigation
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          className="mySwiper2"
        >
          {images.map((image, index) => (
            <SwiperSlide key={image} className={styles["swiper-slide"]}>
              <RoomImage
                onClickImage={() => openModal(index)}
                src={image}
                width={700}
                height={200}
                alt={title}
                className="object-fill "
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
