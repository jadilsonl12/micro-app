import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/nodemailer';
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '../database';
import { createStripeCustomer } from '../stripe';

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    pages: {
        signIn: '/auth',
        signOut: '/auth',
        error: '/auth',
        verifyRequest: '/auth',
        newUser: '/app'
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
                secure: false, // Usa STARTTLS em vez de TLS
                tls: {
                    rejectUnauthorized: false, // Ignora certificados autoassinados
                },
            },
            from: process.env.EMAIL_FROM
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    events: {
        createUser: async (message) => {
            await createStripeCustomer({
                name: message.user.name as string,
                email: message.user.email as string,
            })
        },
    },
})