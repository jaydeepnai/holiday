"use client"
import ListingCard from '@/components/Listings/ListingCard'
import Heading from '@/components/Models/Heading'
import Container from '@/components/Navbar/Container'
import { SafeUser, safeReservation } from '@/types'
import React from 'react'

interface TripsClientProps {
    reservations: safeReservation[],
    currentUser?: SafeUser | null
}

const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = userRouter()
    const [deleteId, setDeleteId] = useState("")

    const onCencel = useCallback((id: string) => {
        setDeleteId(id)

        axios.delete(`/api/reservations/${id}`).then(() => {
            toast.success("Reservation cancelled")
            router.refresh()
        }).catch((error) => {
            toast.error(error?.response?.data?.error)
        }).finally(()=>{
            setDeleteId("")
        })

    }, [router])


    return (
        <Container>
            <Heading
                title="Trips"
                subtitle="Where you've been and where you're going"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {
                    reservations.map((r)=>(
                        <ListingCard
                            key={r.id}
                            data={r.listing}
                            reservation={r}
                            actionId={r.id}
                            onAction={onCencel}
                            disabled={deleteId === r.id}
                            actionLabel="Cancel Reservations"
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </Container>
    )
}

export default TripsClient
