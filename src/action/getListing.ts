import client from "@/libs/prismadb";

export interface IListingParams {
    userId?:string
} 

export default async function getListings(
    params : IListingParams
) {
    try {
        const { userId } = params;

        let query : any = {}

        if(userId){
            query.userId = userId
        }

        const listing = await client.listing.findMany({
            where : query,
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