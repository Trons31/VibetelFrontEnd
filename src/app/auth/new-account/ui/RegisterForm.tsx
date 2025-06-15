"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { login } from "@/actions";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import axios from "axios"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

type FormInputs = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showLoadingRegister, setShowLoadingRegister] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("/home");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormInputs) => {
    setShowLoadingRegister(true);
    setShowErrorMessage(false);
    setErrorMessage("");

    const { name, lastName, email, password } = data;

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}user/register`, { name, lastname: lastName, email, password });
    } catch (error) {
      console.log(error)
      setShowLoadingRegister(false);
      setShowErrorMessage(true);
      setErrorMessage("Este correo ya está registrado. Inicia sesión.");
    }

    setShowLoadingRegister(false);
    await login(email.toLowerCase(), password);
    window.location.replace(redirectUrl);
  };

  const validatePassword = (value: string): string | true => {
    const errors: string[] = [];

    if (value.length < 6) errors.push("6 caracteres");
    if (!/[A-Z]/.test(value)) errors.push("una mayúscula");
    if (!/[0-9]/.test(value)) errors.push("un número");
    if (!/[@$!%*?&.]/.test(value)) errors.push("un carácter especial");

    return errors.length > 0 ? errors.join(", ") : true;
  };

  useEffect(() => {
    const storedRedirectUrl = localStorage.getItem("redirectUrl");
    if (storedRedirectUrl) {
      setRedirectUrl(storedRedirectUrl);
    }
  }, [redirectUrl]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center mt-10 md:mt-10  bg-white "
    >
      <div className="container mx-auto">
        <div className="max-w-md mx-auto ">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-bold text-gray-700 ">
              Registra tu cuenta
            </h1>
          </div>

          <div className="m-7 space-y-4">
            <div className="relative">
              <input
                type="text"
                autoFocus
                className={clsx(
                  "block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100  border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                  {
                    "focus:border-red-600 ": errors.name?.type === "required",
                  }
                )}
                placeholder=" "
                {...register("name", { required: true })}
              />
              <label
                className={clsx(
                  "absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                  {
                    "peer-focus:text-red-600 ":
                      errors.name?.type === "required",
                  }
                )}
              >
                Nombre
              </label>
            </div>

            {errors.name?.type === "required" && (
              <span className="text-red-500  text-sm">
                * El nombre es obligatorio
              </span>
            )}

            <div className="relative">
              <input
                type="text"
                className={clsx(
                  "block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100  border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                  {
                    "focus:border-red-600 ":
                      errors.lastName?.type === "required",
                  }
                )}
                placeholder=" "
                {...register("lastName", { required: true })}
              />
              <label
                className={clsx(
                  "absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                  {
                    "peer-focus:text-red-600 ":
                      errors.lastName?.type === "required",
                  }
                )}
              >
                Apellidos
              </label>
            </div>

            {errors.lastName?.type === "required" && (
              <span className="text-red-500  text-sm">
                * El apellido es obligatorio
              </span>
            )}

            <div className="relative">
              <input
                type="text"
                className={clsx(
                  "block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100  border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                  {
                    "peer-focus:text-red-600 ":
                      errors.email?.type === "required" ||
                      errors.email?.type === "pattern",
                  }
                )}
                placeholder=" "
                {...register("email", {
                  required: true,
                  pattern:
                    /^(?=.{1,254}$)(?:(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(?:"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*"))@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
                })}
              />
              <label
                className={clsx(
                  "absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                  {
                    "peer-focus:text-red-600 ":
                      errors.email?.type === "required" ||
                      errors.email?.type === "pattern",
                  }
                )}
              >
                Correo electronico
              </label>
            </div>

            {errors.email?.type === "required" && (
              <span className="text-red-500 text-sm">
                * El email es obligatorio
              </span>
            )}

            {errors.email?.type === "pattern" && (
              <span className="text-red-500 text-sm">
                * El email debe ser valido
              </span>
            )}

            <div className="mb-6">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={clsx(
                    "block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-10",
                    {
                      "focus:border-red-600 border-red-600": errors.password
                    }
                  )}
                  placeholder=" "
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    validate: validatePassword
                  })}
                />
                <label
                  className={clsx(
                    "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                    {
                      "peer-focus:text-red-600 text-red-600": errors.password
                    }
                  )}
                >
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}

              {errors.password?.type === "validate" && (
                <div className="text-red-500 text-sm">
                  La contraseña debe tener al menos:
                  <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                    {errors.password.message!.toString().split(", ").map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {showErrorMessage && (
              <div className="hover:red-yellow-500 flex justify-center items-center gap-2  w-full mb-2 select-none rounded-t-lg border-t-4 border-red-400 bg-red-100 py-3 px-2 font-medium">
                <p className="text-center" >{errorMessage}</p>
              </div>
            )}

            <div className="mb-1">
              <button
                type="submit"
                disabled={showLoadingRegister}
                className={clsx({
                  "flex items-center gap-x-4 mb-2 w-full mt-2 justify-center rounded-lg bg-red-600 px-3 py-4 hover:bg-red-700 text-lg font-bold text-white":
                    !showLoadingRegister,
                  "flex items-center gap-x-4 mb-2 w-full mt-2 justify-center rounded-lg bg-red-600 px-3 py-4 text-lg font-bold text-white cursor-not-allowed ":
                    showLoadingRegister,
                })}
              >
                {showLoadingRegister && (
                  <svg
                    className="h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}

                {showLoadingRegister ? (
                  <span>Cargando...</span>
                ) : (
                  <span>Crear cuenta</span>
                )}
              </button>
            </div>

            <div className="flex justify-center">
              <p className="text-sm text-gray-600 focus:outline-none font-medium">
                ¿Ya tienes una cuenta?
                <Link
                  href="/auth/login/email"
                  className="text-indigo-600 px-1 hover:underline"
                >
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
