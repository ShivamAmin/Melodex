import { betterAuth, BetterAuthOptions } from 'better-auth';
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from '@/lib/prisma';
import { openAPI } from "better-auth/plugins";
import { sendEmail } from "@/actions/emailer";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    plugins: [openAPI()],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url }) => {
            await sendEmail({
                sendTo: user.email,
                subject: 'Reset your Melodex password',
                text: `Click the link to reset your password: ${url}`,
            })
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, token }) => {
            const verificationURL = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.BETTER_AUTH_URL}/verified`;
            await sendEmail({
                sendTo: user.email,
                subject: "Verify your Melodex account",
                text: `Click the link to verify your email: ${verificationURL}`,
            })
        }
    }
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;