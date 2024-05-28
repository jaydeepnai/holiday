import client from "@/libs/prismadb";

export default async function getListings() {
    try {
        const listing = await client.listing.findMany({
            orderBy : {
                created : "desc"
            }
        })
        return listing
    } catch (error:any) {
        throw new Error(error)
    }
}