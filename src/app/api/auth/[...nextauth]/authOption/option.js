import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { queryes } from "@/lib/database/database";
export const authOption = {
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                const { email, password } = credentials;
                if (!email || !password) {
                    return null
                }
                try {

                    const result = await queryes({
                        query: `SELECT * FROM users WHERE email = ? LIMIT 1`,
                        values: [email],
                    });

                    const user = result[0];
                    console.log(user, "user");

                    if (!user) {
                        return null
                    }
                    const isMatched = await bcrypt.compare(password, user.password);
                    if (!isMatched) {
                        return null
                    }
                    return user;
                } catch (error) {
                    console.log(error);

                }
            }

        })
    ],
    pages: {
        signIn: '/auth/login'
    },
    callbacks: {
        async jwt({ user, token }) {
            if (user) {
                token.email = user.email,
                    token.name = user.name,
                    token.role = user.role
            };
            return token
        },
        async session({ session, token, }) {
            session.user.email = token.email,
                session.user.name = token.name,
                session.user.role = token.role
            return session
        },

    },

}