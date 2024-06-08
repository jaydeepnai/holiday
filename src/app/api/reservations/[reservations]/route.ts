import { getCurrentUser } from "@/action/getCurrentUser"
import client from "@/libs/prismadb"

 interface IParams{
    reseravationId ? : string
 }

 export async function DELETE(request:Request,{params}:{params:IParams}) {
    const currentUser = await getCurrentUser()
    
    if(!currentUser){
        return NextResponse.error()
    }

    const {reseravationId } = params

    if(!reseravationId || typeof reseravationId !== "string"){
        throw new Error("Invalid ID")
    }

    const reseravation = await client.reservation.deleteMany({
        where : { id : reseravationId, OR : [
            {userId : currentUser.id},
            {listing : {userId : currentUser.id}}
        ] }
    })
 }