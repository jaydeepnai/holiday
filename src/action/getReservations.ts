import client from "@/libs/prismadb";

interface IParams{
    listingid?:string;
    userId?: string;
    authorId?:string
}

export default async function getReservations (params:IParams){
    try {  
        const {userId,authorId} = params
        const query = {}
    
        if(params.params.listingid){
            query.listingId = params.params.listingid
        }
    
        if(userId){
            query.userId = userId
        }
    
        if(authorId){
            query.listing = {userId : authorId}
        }
    
        const reservations  = await client.reservation.findMany({
            where : query,
            include : {listing :true},
            orderBy : {createdAt : "desc"}
        })
    
        const safeReservation = reservations.map((reservation)=>({
            ...reservation,
            createdAt:reservation.createdAt.toISOString(),
            startDate : reservation.startDate.toISOString(),
            endDate:reservation.endDate.toISOString(),
            listing:{
                ...reservation.listing,
                created: reservation.listing.created.toISOString()
            }
        }))
    
        return safeReservation
    } catch (error:any) {
        throw new Error(error)
    }

}