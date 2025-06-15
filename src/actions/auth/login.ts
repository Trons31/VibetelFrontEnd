'use server';

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';
import { sleep } from '@/utils';

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {

    //  await sleep(1);

    // Inicia sesión con credenciales
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success;'

  } catch (error) {
    console.log("Error case")
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'OAuthCallbackError':
          return 'Error al iniciar sesión con Google. Inténtalo de nuevo.';
        case 'CredentialsSignin':
          return 'Credenciales incorrectas. Intenta de nuevo';
        default:
          return 'Something went wrong.';
      }
    }
    return "Error desconocido"
  }
}



export const login = async (email: string, password: string) => {

  try {

    await signIn('credentials', { email, password })

    return { ok: true }

  } catch (error) {
    return {
      ok: false,
    }
  }

}