import client from "@/libs/prismadb";

export default async function getListings() {
    try {
        const listing = await client.listing.findmany({
            orderBy : {
                createdAt : "desc"
            }
        })
        return listing
    } catch (error) {
        throw new Error(error)
    }
}