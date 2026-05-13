import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const email = String(credentials?.email ?? "").toLowerCase().trim();
                const password = String(credentials?.password ?? "");

                if(!email || !password){
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    }
                });

                if(!user){
                    return null;
                }

                const isValidPassword = await bcrypt.compare(
                    password,
                    user.passwordHash,
                );

                if (!isValidPassword){
                    return null;
                }

                return{
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
            }
        

        }),
        
        
        
    ],

    
});