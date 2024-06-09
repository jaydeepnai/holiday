import client from "@/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export default async function getFavoriteListings() {
    try {
        const currentUser = await getCurrentUser()

        if(!currentUser){
            return []
        }

        const favorites = await client.listing.findMany({
            where : { id : { in : [...(currentUser.favoriteIds || [])] } }
        })
        console.log("favorites",favorites)
        const safeFavorites = favorites.map((f)=>({
            ...f,
            createdAt : f.created.toISOString()
        }))

        return safeFavorites

    } catch (error:any) {
        throw new Error(error?.message)
    }
}