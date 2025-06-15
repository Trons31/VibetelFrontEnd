"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authenticate } from "@/actions/auth/login";
import { sleep } from "@/utils";
import clsx from "clsx";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

type FormInputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [showLoadingLogin, setShowLoadingLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onDispatch = async (data: FormInputs) => {
    setShowLoadingLogin(true);
    await sleep(1);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      await dispatch(formData);
    } catch (error) {
      setShowLoadingLogin(false);
    } finally {
      setShowLoadingLogin(false);
    }
  };

  useEffect(() => {
    if (state === "Success;") {
      window.location.replace("/admin/dashboard-partner-motel");
    }
  }, [state]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onDispatch)}
        className="flex flex-col items-stretch pt-3 md:pt-3"
      >
        <div className="flex flex-col pt-4">
          <div
            className={clsx(
              "relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600",
              {
                "focus-within:border-red-600 border-red-600": errors.email,
              }
            )}
          >
            <input
              autoFocus
              type="email"
              id="login-email"
              className={clsx(
                "w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
              )}
              {...register("email", {
                required: true,
                pattern:
                  /^(?=.{1,254}$)(?:(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(?:"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*"))@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
              })}
              placeholder="Correo electronico"
            />
          </div>
          {errors.email?.type === "required" && (
            <span className="text-red-500">
              * Ingrese su correo electronico
            </span>
          )}

          {errors.email?.type === "pattern" && (
            <span className="text-red-500">*El email debe ser valido</span>
          )}
        </div>
        <div className="mb-4 flex flex-col pt-4">
          <div
            className={clsx(
              "relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600",
              {
                "focus-within:border-red-600 border-red-600": errors.password,
              }
            )}
          >
            <input
              type={showPassword ? "text" : "password"}
              id="login-password"
              className={clsx(
                "w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none",
                {
                  "border-red-500": errors.password,
                }
              )}
              {...register("password", { required: true })}
              placeholder="Contraseña"
            />
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
            <span className="text-red-500">*Ingrese su contraseña</span>
          )}
        </div>
        <Link
          href="/auth/recover-password-motel-partner/send-request"
          className="mb-4 text-center underline text-sm font-medium text-gray-600 md:text-right hover:text-indigo-500 "
        >
          ¿Olvidaste tu contraseña?
        </Link>

        {state === "Credenciales incorrectas. Intenta de nuevo" && (
          <>
            <div className="hover:red-yellow-500  flex justify-center items-center gap-2  w-full mb-4 select-none rounded-t-lg border-t-4 border-red-400 bg-red-100 py-3 px-2 font-medium">
              <p className="text-center" >{state}</p>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={showLoadingLogin}
          className={clsx({
            "flex items-center gap-x-4 mb-2 w-full mt-1 justify-center rounded-lg bg-red-600 px-3 py-3 md:py-4 hover:bg-red-700 text-lg font-bold text-white":
              !showLoadingLogin,
            "flex items-center gap-x-4 mb-2 w-full mt-1 justify-center rounded-lg bg-red-600 px-3 py-3 md:py-4 text-lg font-bold text-white cursor-not-allowed":
              showLoadingLogin,
          })}
        >
          {showLoadingLogin && (
            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}

          {showLoadingLogin ? (
            <span>Cargando...</span>
          ) : (
            <span>Iniciar sesion</span>
          )}
        </button>
      </form>

      <div className="flex justify-center mt-1">
        <p className="text-sm text-gray-600 focus:outline-none font-medium ">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/motel-partner"
            className="text-indigo-600 hover:underline"
          >
            Crear cuenta
          </Link>
        </p>
      </div>
    </>
  );
};
