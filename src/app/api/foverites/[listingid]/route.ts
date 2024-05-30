import { getCurrentUser } from "@/action/getCurrentUser"
import client from "@/libs/prismadb"

interface IParams {
    listingid?: string
}

export async function POST(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.erro()
    }

    const { listingid } = params

    if (!listingid || typeof listingid !== "string") {
        throw new Error("Invalid ID")
    }

    let foveriteIds = [...(currentUser.favoriteIds || [])]

    foveriteIds.push(listingid)

    const user = await client.user.update({
        where: { id: currentUser.id },
        data: { foveriteIds }
    })

    return NextResponse.json(user)
}



export async function DELETE(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
        return NextResponse.erro()
    }

    const { listingid } = params

    if (!listingid || typeof listingid !== "string") {
        throw new Error("Invalid ID")
    }

    let foveriteIds = [...(currentUser.favoriteIds || [])]

    foveriteIds = foveriteIds.filter((id)=> id !== listingid)

    const user = await client.user.update({
        where: { id: currentUser.id },
        data: { foveriteIds }
    })

    return NextResponse.json(user)

}