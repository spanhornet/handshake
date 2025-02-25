// Environment Variables
import { config } from 'dotenv';

// Better Auth
import { createAuthClient } from "better-auth/react"

config({ path: '.env' });

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL!
})

export const { signIn, signUp, useSession } = createAuthClient()