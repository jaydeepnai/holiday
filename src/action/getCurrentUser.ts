import client from "@/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth"
import toast from "react-hot-toast";

export async function getSession(){
    return await getServerSession(authOptions);
}

export async function getCurrentUser(){
    try {
        const session = await getSession();
        if(!session?.user?.email) return null;
        
        const currentUser = await client.user.findUnique({
            where : { email: session.user.email as string}
        })

        if(!currentUser) return null;
        return {
            ...currentUser,
            createdAt : currentUser.createdAt?.toISOString(),
            updatedAt : currentUser.updatedAt?.toISOString(),
            emailVarified : currentUser.emailVarified?.toISOString() || null,
        };
    } catch (error : any) {
        toast.error(error.message);
        return null;
    }
}