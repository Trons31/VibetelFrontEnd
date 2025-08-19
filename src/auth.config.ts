import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProfile from 'next-auth/providers/google';
import FacebookProfile from 'next-auth/providers/facebook';

import { z } from 'zod';
import axios from 'axios';

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login/email',
        newUser: "/auth/new-account",
    },

    callbacks: {

        jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token;
                token.expiresAt = user.expiresAt;
                token.user = {
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    roles: user.roles,
                };
            }
            return token;
        },

        session({ session, token }) {
            session.accessToken = token.accessToken as any;
            session.expiresAt = token.expiresAt as number;
            session.user = token.user as any;
            return session;
        },

    },

    providers: [
        GoogleProfile({ // Cambia GoogleProvider por GoogleProfile
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        FacebookProfile({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,

        }),

        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                try {
                    // Llamar a la API para autenticar al usuario
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}user/login`, {
                        email: email.toLowerCase(),
                        password,
                    });

                    const user = response.data;
                    // Validar si el usuario existe
                    if (!user) return null;

                    return {
                        id: user.id,
                        name: user.name,
                        lastName: user.lastname,
                        email: user.email,
                        roles: user.roles,
                        token: user.token,
                        expiresAt: user.expiresAt,
                    };
                } catch (error) {
                    if (axios.isAxiosError(error) && error.response?.status === 401) {
                        // Simplemente devolvemos null para que NextAuth maneje el error
                        return null;
                    }
                    return null;
                }
            },
        }),
    ],


};


export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);