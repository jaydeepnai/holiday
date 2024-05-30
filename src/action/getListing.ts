import client from "@/libs/prismadb";

export default async function getListings() {
    try {
        const listing = await client.listing.findMany({
            orderBy : {
                created : "desc"
            }
        })
        const safeListing = listing.map((l)=>({
            ...l,
            created : l.created.toISOString()
        }))
        return safeListing
    } catch (error:any) {
        throw new Error(error)
    }
}