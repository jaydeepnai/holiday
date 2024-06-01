import client from "@/libs/prismadb"

interface IParams {
    listingid ? : string
}

export default async function getListingByID(params:IParams) {
    console.log(params.listingid)
    try {
        const listing = await client.listing.findUnique({
            where :{id : params.params.listingid},
            include :{user:true},
        })

        if(!listing){
            return null
        }

        return {
            ...listing,
            created : listing.created.toISOString(),
            user : {
                ...listing.user,
                createdAt:listing?.user?.createdAt?.toISOString(),
                updatedAt :listing?.user?.updatedAt?.toISOString(),
                emailVerified:listing.user?.emailVarified?.toISOString() || null
            }
        }

    } catch (error:any) {
        throw new Error(error)
    }
}