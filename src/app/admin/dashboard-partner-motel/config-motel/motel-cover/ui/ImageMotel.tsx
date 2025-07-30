'use client';


import { useState } from "react";
import Image from 'next/image';
import toast, { Toaster } from "react-hot-toast";
import clsx from "clsx";
import { sleep } from "@/utils";
import axios from "axios";

interface Props {
  accessToken: string;
  motelImage?: string | undefined;
  imageId?: string | undefined;
}

interface FormInputs {
  images?: FileList,
}

export const ImageMotel = ({ accessToken, motelImage, imageId }: Props) => {

  const [showLoadingButton, setShowLoadingButton] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };


  const handleSave = async () => {
    setShowLoadingButton(true);
    await sleep(3);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}motel/image`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success("Imagen guardada!")
        setSelectedFile(null);
        window.location.replace('/admin/dashboard-partner-motel/config-motel/motel-cover');
      } catch (error: any) {
        console.error("Error al cargar habitaciones:", error);
        toast.error("No se pudo guardar la imagen!")
        setShowLoadingButton(false);
        return;
      } finally {
        setShowLoadingButton(false); // Desactivar carga de habitaciones
      }
    } else {
      setShowLoadingButton(false);
    }
  };

  return (

    <>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      {
        motelImage
          ? (
            <>
              <div>
                <div className="mt-5 block space-y-2 md:flex justify-between mb-5" >
                  <label htmlFor="fileInput" className="text-xs md:text-sm bg-gray-200 inline-block py-2 px-4 rounded-lg cursor-pointer">
                    Seleccionar archivo
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  {
                    selectedFile &&
                    (
                      <button
                        onClick={handleSave}
                        type='submit'
                        disabled={showLoadingButton}
                        className={
                          clsx(

                            {
                              "flex text-xs md:text-sm items-center gap-x-4 rounded-lg bg-blue-600 hover:bg-blue-700 px-7 py-2 font-medium text-white": !showLoadingButton,
                              "flex text-xs md:text-sm items-center gap-x-4 rounded-lg bg-blue-600 px-7 py-2 font-medium text-white cursor-not-allowed": showLoadingButton
                            }
                          )
                        }>
                        {
                          showLoadingButton &&
                          (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>)
                        }

                        {
                          showLoadingButton
                            ? (
                              <span>Cargando...</span>
                            ) : (
                              <span>Actualizar imagen</span>
                            )
                        }

                      </button>
                    )
                  }

                </div>


                {
                  selectedFile
                    ? (
                      <>
                        <div className="grid grid-cols-2 gap-10" >
                          <div className="flex items-center" >
                            <div className="max-w-xs" >
                              <div className=" bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray-300 relative">
                                <div className="flex items-center justify-center w-full h-56 bg-gray-300 rounded  ">
                                  <Image
                                    src={URL.createObjectURL(selectedFile)}
                                    width={300}
                                    height={100}
                                    alt={selectedFile.name}
                                    className="w-full object-cover rounded-md h-full"
                                  />
                                </div>
                                <div className="p-5">
                                  <a href="#">
                                    <div className="h-2.5 bg-gray-400 rounded-full  w-24 mb-4"></div>
                                  </a>
                                  <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-4"></div>
                                  <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-4"></div>
                                </div>

                              </div>
                              <span className="mt-5  text-xs text-gray-700 block">Así se visualizará el logotipo del motel en la sección de moteles registrados</span>

                            </div>

                          </div>


                          <div>
                            <div className="max-w-md bg-white rounded-lg shadow-lg shadow-gray-300 relative">
                              <div className="border-2 flex justify-betwee rounded-t-lg border-gray-200 p-2 py-4" >

                                <div>
                                  <div className="rounded-full w-4 h-4 bg-gray-400" >
                                  </div>
                                </div>

                                <div className="text-xs tex-gray-800" >
                                  <div className="rounded-md w-20 h-3 bg-gray-400" >
                                  </div>
                                </div>

                                <div>
                                  <div className="rounded-md w-8 h-3 bg-gray-400" >
                                  </div>
                                </div>

                              </div>
                              <div className="flex items-center justify-center w-full h-48 bg-gray-300 ">
                                <Image
                                  src={URL.createObjectURL(selectedFile)}
                                  width={300}
                                  height={100}
                                  layout="respomsive"
                                  alt={selectedFile.name}
                                  className="w-full object-cover h-full"
                                />
                              </div>
                              <div className="p-5">
                                <div className="flex justify-center" >
                                  <div className="h-2.5 flex bg-gray-400 rounded-full  w-24 mb-4"></div>
                                </div>
                                <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-4"></div>
                                <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-4"></div>
                              </div>
                            </div>
                            <span className="mt-5 text-xs text-gray-700 block">Así se visualizará el logotipo del motel en la sección de informacion del motel</span>
                          </div>

                        </div>
                      </>
                    )
                    : (
                      <div className="block space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-10" >
                        <div className="flex items-center" >
                          <div className="max-w-xs" >
                            <div className=" bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray-300 relative">
                              <div className="flex items-center justify-center w-full h-56 bg-gray-300 rounded  ">
                                <Image
                                  src={motelImage}
                                  width={400}
                                  height={100}
                                  alt={motelImage}
                                  className="w-full object-cover rounded-md h-full"
                                />
                              </div>
                              <div className="p-5">
                                <a href="#">
                                  <div className="h-2.5 bg-gray-400 rounded-full  w-24 mb-4"></div>
                                </a>
                                <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-4"></div>
                                <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-4"></div>
                              </div>

                            </div>
                            <span className="mt-5  text-xs text-gray-700 block">Así se visualizará el logotipo del motel en la sección de moteles registrados</span>

                          </div>

                        </div>


                        <div>
                          <div className="max-w-md bg-white rounded-lg shadow-lg shadow-gray-300 relative">
                            <div className="border-2 flex justify-between rounded-t-lg border-gray-200 p-2 py-4" >

                              <div>
                                <div className="rounded-full w-4 h-4 bg-gray-400" >
                                </div>
                              </div>

                              <div className="text-xs tex-gray-800" >
                                <div className="rounded-md w-20 h-3 bg-gray-400" >
                                </div>
                              </div>

                              <div>
                                <div className="rounded-md w-8 h-3 bg-gray-400" >
                                </div>
                              </div>

                            </div>
                            <div className="flex items-center justify-center w-full h-48 bg-gray-300 ">
                              <Image
                                src={motelImage}
                                width={300}
                                height={100}
                                layout="respomsive"
                                alt={motelImage}
                                className="w-full object-cover rounded-md h-full"
                              />
                            </div>
                            <div className="p-5">
                              <div className="flex justify-center" >
                                <div className="h-2.5 flex bg-gray-400 rounded-full  w-24 mb-4"></div>
                              </div>
                              <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-4"></div>
                              <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-4"></div>
                            </div>
                          </div>
                          <span className="mt-5 text-xs text-gray-700 block">Así se visualizará el logotipo del motel en la sección de informacion del motel</span>
                        </div>

                      </div>
                    )
                }

              </div>

            </>
          ) :
          (
            <>
              <div className="">
                <div className="mt-5 block space-y-2 md:flex justify-between mb-5" >
                  <label htmlFor="fileInput" className=" bg-gray-200 inline-block py-2 px-4 rounded-lg cursor-pointer text-xs md:text-sm">
                    Seleccionar archivo
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>


                  {
                    selectedFile &&
                    (

                      <button
                        onClick={handleSave}
                        type='submit'
                        disabled={!selectedFile && showLoadingButton}
                        className={
                          clsx(

                            {
                              "flex text-xs md:text-sm items-center gap-x-4 rounded-lg bg-blue-600 hover:bg-blue-700 px-7 py-2 font-medium text-white": !showLoadingButton,
                              "flex text-xs md:text-sm items-center gap-x-4 rounded-lg bg-blue-600 px-7 py-2 font-medium text-white cursor-not-allowed": showLoadingButton
                            }
                          )
                        }>
                        {
                          showLoadingButton &&
                          (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" ></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>)
                        }

                        {
                          showLoadingButton
                            ? (
                              <span>Cargando...</span>
                            ) : (
                              <span>Guardar imagen</span>
                            )
                        }

                      </button>

                    )
                  }


                </div>
                {selectedFile
                  ? (
                    <>
                      <div className="block space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-10 " >
                        <div className="flex items-center" >
                          <div className="max-w-xs" >
                            <div className=" bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray-300 relative">
                              <div className="flex items-center justify-center w-full h-56 bg-gray-300 rounded  ">
                                <Image
                                  src={URL.createObjectURL(selectedFile)}
                                  width={300}
                                  height={100}
                                  alt={selectedFile.name}
                                  className="w-full object-cover rounded-md h-full"
                                />
                              </div>
                              <div className="p-5">
                                <a href="#">
                                  <div className="h-2.5 bg-gray-400 rounded-full  w-24 mb-4"></div>
                                </a>
                                <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-4"></div>
                                <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-4"></div>
                              </div>

                            </div>
                            <span className="mt-5  text-xs text-gray-700 block">Así se visualizará el logotipo del motel en la sección de moteles registrados</span>

                          </div>

                        </div>


                        <div>
                          <div className="max-w-md bg-white  rounded-lg shadow-lg shadow-gray-300 relative">
                            <div className="border-2 flex justify-between rounded-t-lg border-gray-200 p-2 py-4" >

                              <div>
                                <div className="rounded-full w-4 h-4 bg-gray-400" >
                                </div>
                              </div>

                              <div className="text-xs tex-gray-800" >
                                <div className="rounded-md w-20 h-3 bg-gray-400" >
                                </div>
                              </div>

                              <div>
                                <div className="rounded-md w-8 h-3 bg-gray-400" >
                                </div>
                              </div>

                            </div>
                            <div className="flex items-center justify-center w-full h-48 bg-gray-300 ">
                              <Image
                                src={URL.createObjectURL(selectedFile)}
                                width={300}
                                height={100}
                                layout="respomsive"
                                alt={selectedFile.name}
                                className="w-full object-cover rounded-md h-full"
                              />
                            </div>
                            <div className="p-5">
                              <div className="flex justify-center" >
                                <div className="h-2.5 flex bg-gray-400 rounded-full  w-24 mb-4"></div>
                              </div>
                              <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-4"></div>
                              <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-4"></div>
                            </div>
                          </div>
                          <span className="mt-5 text-xs text-gray-700 block">Así se visualizará el logotipo del motel en la sección de informacion del motel</span>
                        </div>

                      </div>
                    </>
                  )
                  : (
                    <>
                      <div className="block space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-10 " >

                        <div className="flex items-center" >
                          <div className="max-w-xs" >
                            <div className="max-w-xs bg-white    border border-gray-200 rounded-lg shadow-lg shadow-gray-300 relative">

                              <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded  ">
                                <svg className="w-10 h-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                </svg>
                              </div>
                              <div className="p-5">
                                <a href="#">
                                  <div className="h-2.5 bg-gray-400 rounded-full  w-24 mb-4"></div>
                                </a>
                                <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-4"></div>
                                <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-4"></div>
                              </div>
                            </div>
                            <span className="mt-2 md:mt-5 text-xs text-gray-700 block">Así se visualizará el logotipo del motel en la sección de moteles registrados</span>
                          </div>
                        </div>


                        <div>
                          <div className="max-w-md bg-white rounded-lg shadow-lg shadow-gray-300 relative">
                            <div className="border-2 flex justify-between rounded-t-lg border-gray-200 p-2 py-4" >

                              <div>
                                <div className="rounded-full w-4 h-4 bg-gray-400" >
                                </div>
                              </div>

                              <div className="text-xs tex-gray-800" >
                                <div className="rounded-md w-20 h-3 bg-gray-400" >
                                </div>
                              </div>

                              <div>
                                <div className="rounded-md w-4 h-3 bg-gray-400" >
                                </div>
                              </div>

                            </div>
                            <div className="flex items-center justify-center w-full h-48 bg-gray-300 ">
                              <svg className="w-10 h-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                              </svg>
                            </div>
                            <div className="p-5">
                              <div className="flex justify-center" >
                                <div className="h-2.5 flex bg-gray-400 rounded-full  w-24 mb-4"></div>
                              </div>
                              <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-4"></div>
                              <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-4"></div>
                            </div>
                          </div>
                          <span className="mt-2 md:mt-5 text-xs text-gray-700 block">Así se visualizará el logotipo del motel en la sección de informacion del motel</span>
                        </div>

                      </div>
                    </>
                  )

                }

              </div>
            </>
          )
      }

    </>

  )
}
