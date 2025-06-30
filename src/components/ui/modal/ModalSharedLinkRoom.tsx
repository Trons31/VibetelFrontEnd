"use client";
import { useEffect } from "react";
import { RatingRoomReservation, RoomImage } from "@/components";
import { RoomApi } from "@/interfaces";
import { currencyFormat } from "@/utils";
import toast, { Toaster } from "react-hot-toast";
import { BsMessenger } from "react-icons/bs";
import { FaWhatsapp, FaFacebook, FaTwitter } from "react-icons/fa";
import { IoCopy, IoMail } from "react-icons/io5";
import { MdClose, MdInsertLink } from "react-icons/md";
import { TbPointFilled } from "react-icons/tb";

interface ModalProps {
  isOpen: boolean;
  room: RoomApi;
  onClose: () => void;
}

export const ModalSharedLinkRoom = ({ isOpen, onClose, room }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCopyLink = () => {
    const url = `https://vibetel.vercel.app/room/${room.slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Enlace copiado al portapapeles");
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(
      `¡Mira esta habitación en ${room.motel.razonSocial}!`
    );
    const body = encodeURIComponent(
      `Echa un vistazo a esta habitación: https://vibetel.vercel.app/room/${room.slug}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      `https://vibetel.vercel.app/room/${room.slug}`
    )}`;
    window.open(url, "_blank");
  };

  const handleMessengerShare = () => {
    const url = `https://www.messenger.com/t/?link=${encodeURIComponent(
      `https://vibetel.vercel.app/room/${room.slug}`
    )}`;
    window.open(url, "_blank");
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      `https://vibetel.vercel.app/room/${room.slug}`
    )}`;
    window.open(url, "_blank");
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(
      `¡Mira esta habitación en ${room.motel.razonSocial}!`
    );
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      `https://vibetel.vercel.app/room/${room.slug}`
    )}&text=${text}`;
    window.open(url, "_blank");
  };

  const handleInsertLink = () => {
    alert(`Usa este código HTML para insertar el widget: 
<iframe src="https://vibetel.vercel.app/room/${room.slug}" width="600" height="400"></iframe>`);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div
        className="fixed fade-in inset-0 z-50 overflow-y-hidden md:p-5 py-5 px-0 w-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div className="bg-white md:rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 px-2 md:p-0 max-h-full overflow-y-auto">
          <div className="px-5 flex justify-end md:px-4 mt-4">
            <button
              onClick={onClose}
              className="hover:bg-gray-200 p-2 rounded-full"
            >
              <MdClose className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-3 px-7 md:px-6">
            <p className="text-lg md:text-2xl font-medium">
              Comparte esta Habitacion
            </p>
          </div>

          <div className="mt-3 px-6 mb-10 md:mb-6">
            <div className="hidden md:flex gap-3 items-end">
              <div className="h-full w-[120px] relative object-cover mt-3">
                <RoomImage
                  className="rounded"
                  src={room.images[0].url}
                  width={600}
                  height={500}
                  alt={room.title}
                />
              </div>
              <div className="">
                <div className="block md:flex ml-1 gap-1 items-center">
                  <p className="capitalize text-md font-extralight">
                    {room.motel.razonSocial}
                  </p>
                  <span className="hidden md:block text-gray-900">
                    <TbPointFilled className="w-2 h-2 text-black" />
                  </span>
                  <p className="capitalize text-md font-extralight">
                    {room.title}
                  </p>
                  <span className="hidden md:block text-gray-900">
                    <TbPointFilled className="w-2 h-2 text-black" />
                  </span>
                  <p className="capitalize text-md font-extralight">
                    {currencyFormat(room.price)}
                  </p>
                  <span className="hidden md:block">
                    <TbPointFilled className="w-2 h-2 text-black" />
                  </span>
                  <p className="capitalize text-md font-extralight">
                    {room.timeLimit} horas
                  </p>
                </div>

                <div className="md:flex gap-1 ml-1 items-center">
                  <p className="capitalize text-md font-extralight">
                    {room.motel.city.department.name}
                  </p>
                  <span className="hidden md:block">
                    <TbPointFilled className="w-2 h-2 text-black" />
                  </span>
                  <p className="capitalize text-md font-extralight">
                    {room.motel.city.name}
                  </p>
                  <span className="hidden md:block">
                    <TbPointFilled className="w-2 h-2 text-black" />
                  </span>
                  <p className="capitalize text-md font-extralight">
                    {room.motel.address}
                  </p>
                </div>
                {/* {room.ratings.length > 0 && (
                  <RatingRoomReservation ratings={room.ratings} />
                )}  */}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 md:mt-8">
              {/* Botones */}
              <button
                onClick={handleCopyLink}
                className="p-3 flex gap-3 items-center rounded-2xl border border-gray-300 hover:bg-gray-100"
              >
                <IoCopy className="h-5 w-5" />
                <span>Enlace</span>
              </button>
              <button
                onClick={handleEmailShare}
                className="p-3 flex gap-3 items-center rounded-2xl border border-gray-300 hover:bg-gray-100"
              >
                <IoMail className="h-5 w-5" />
                <span>Mail</span>
              </button>
              <button
                onClick={handleWhatsAppShare}
                className="p-3 flex gap-3 items-center rounded-2xl border border-gray-300 hover:bg-gray-100"
              >
                <FaWhatsapp className="h-5 w-5" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleMessengerShare}
                className="p-3 flex gap-3 items-center rounded-2xl border border-gray-300 hover:bg-gray-100"
              >
                <BsMessenger className="h-5 w-5" />
                <span>Messenger</span>
              </button>
              <button
                onClick={handleFacebookShare}
                className="p-3 flex gap-3 items-center rounded-2xl border border-gray-300 hover:bg-gray-100"
              >
                <FaFacebook className="h-5 w-5" />
                <span>Facebook</span>
              </button>
              <button
                onClick={handleTwitterShare}
                className="p-3 flex gap-3 items-center rounded-2xl border border-gray-300 hover:bg-gray-100"
              >
                <FaTwitter className="h-5 w-5" />
                <span>Twitter</span>
              </button>
              <button
                onClick={handleInsertLink}
                className="p-3 flex gap-3 items-center rounded-2xl border border-gray-300 hover:bg-gray-100"
              >
                <MdInsertLink className="h-5 w-5" />
                <span>Insertar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
