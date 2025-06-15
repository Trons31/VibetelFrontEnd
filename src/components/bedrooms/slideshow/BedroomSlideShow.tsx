"use client";
import { SkeletonImagesRoom, SlideShowImages } from "@/components";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TbLayoutGridAdd } from "react-icons/tb";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const BedroomSlideShow = ({ images, title, className }: Props) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const mainImage = images[0]; // Siempre la primera imagen es la principal
  const smallImages = images.slice(1, 5); // Tomamos hasta 4 imágenes pequeñas

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const openModal = (index: number) => {
    setStartIndex(index);
    setShowAllImages(true);
  };

  const openAllImages = () => {
    setStartIndex(0);
    setShowAllImages(true);
  };

  return (
    <>
      <SlideShowImages
        images={images}
        isOpen={showAllImages}
        onClose={() => setShowAllImages(false)}
        initialIndex={startIndex}
      />

      {
        isLoading
          ? (
            <div className="hidden md:block" >
              <SkeletonImagesRoom />
            </div>
          ) : (
            <div className={`${className} relative`}>
              {/* Grid principal */}
              <div className="grid grid-cols md:grid-cols-4 grid-rows-2 gap-2 h-[300px] rounded-lg overflow-hidden">
                {/* Imagen principal grande */}
                <div className="col-span-2 row-span-2 relative">
                  <Image
                    onClick={() => openModal(0)}
                    src={mainImage}
                    alt={title}
                    fill
                    className="object-cover w-full h-full rounded-lg cursor-pointer hover:brightness-75"
                  />
                </div>

                {/* Lógica para distribuir las imágenes pequeñas */}
                {smallImages.length === 1 && (
                  <div className="col-span-2 row-span-2 relative">
                    <Image
                      onClick={() => openModal(1)}
                      src={smallImages[0]}
                      alt={`${title} - 1`}
                      fill
                      className="object-cover w-full h-full rounded-lg cursor-pointer hover:brightness-75"
                    />
                  </div>
                )}

                {smallImages.length === 2 && (
                  <>
                    <div className="col-span-2 row-span-1 relative">
                      <Image
                        onClick={() => openModal(1)}
                        src={smallImages[0]}
                        alt={`${title} - 1`}
                        fill
                        className="object-cover w-full h-full rounded-lg cursor-pointer hover:brightness-75"
                      />
                    </div>
                    <div className="col-span-2 row-span-1 relative">
                      <Image
                        onClick={() => openModal(2)}
                        src={smallImages[1]}
                        alt={`${title} - 2`}
                        fill
                        className="object-cover w-full h-full rounded-lg cursor-pointer hover:brightness-75"
                      />
                    </div>
                  </>
                )}

                {smallImages.length === 3 && (
                  <>
                    <div className="col-span-1 row-span-1 relative">
                      <Image
                        onClick={() => openModal(1)}
                        src={smallImages[0]}
                        alt={`${title} - 1`}
                        fill
                        className="object-cover w-full h-full rounded-lg cursor-pointer hover:brightness-75"
                      />
                    </div>
                    <div className="col-span-1 row-span-1 relative">
                      <Image
                        onClick={() => openModal(2)}
                        src={smallImages[1]}
                        alt={`${title} - 2`}
                        fill
                        className="object-cover w-full h-full rounded-lg cursor-pointer hover:brightness-75"
                      />
                    </div>
                    <div className="col-span-2 row-span-1 relative">
                      <Image
                        onClick={() => openModal(3)}
                        src={smallImages[2]}
                        alt={`${title} - 3`}
                        fill
                        className="object-cover w-full h-full rounded-lg cursor-pointer hover:brightness-75"
                      />
                    </div>
                  </>
                )}

                {smallImages.length >= 4 && (
                  <>
                    {smallImages.slice(0, 4).map((image, index) => (
                      <div key={index} className="col-span-1 row-span-1 relative">
                        <Image
                          onClick={() => openModal(index + 1)}
                          src={image}
                          alt={`${title} - ${index + 1}`}
                          fill
                          className="object-cover w-full h-full rounded-lg cursor-pointer hover:brightness-75"
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Botón "Mostrar todas las fotos" */}
              <button
                onClick={openAllImages}
                className="absolute bottom-4 right-4 bg-white text-black hover:text-white hover:bg-black px-3 py-2 rounded-md flex items-center gap-2 duration-300 transition-all border border-black"
              >
                <TbLayoutGridAdd size={18} />
                Mostrar todas las fotos
              </button>

              {/* Modal de imágenes */}
            </div>
          )
      }
    </>
  );
};
