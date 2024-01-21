import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET

        })
    ],
    pages: {
        signIn: '/auth/signin',
        secret: process.env.JWT_SECRET,
    },
    callbacks: {
        async session ({ session, token, user }) {
            session.user.username = session.user.name
            .split(" ")
            .join("")
            .toLocaleLowerCase();
            // here the above it makes for example "Shoaib Khan" to "shoaibkhan"

            session.user.uid = token.sub;
            return session;
        },
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }