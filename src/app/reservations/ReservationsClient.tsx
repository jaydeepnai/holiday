"use client"
import ListingCard from '@/components/Listings/ListingCard';
import Container from '@/components/Navbar/Container';
import { SafeUser, safeReservation } from '@/types'
import React from 'react'

interface ReservationsClientProps {
    reservations: safeReservation[];
    currentUser: SafeUser | null
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter()
    const [deleteId, setDeleteId] = useState("")

    const onCancel = useCallback((id : string) => {
        setDeleteId("")

        axios.delete(`/api/reservations/${id}`).then(()=>{
            toast.success("Reservation cancelled")
            router.refresh()
        }).catch((error)=>{
            toast.error("Somthing went Error")
        }).finally(()=>{
            setDeleteId("")
        })

    }, [router])

    return (
        <Container>
            <Heading
                title="Reservations"
                subtitle="Bookings On Your Properties"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((r)=>(
                    <ListingCard
                        key={r.id}
                        data={r.listing}
                        reservation={r}
                        actionId={r.id}
                        onAction={onCancel}
                        disabled={deleteId === r.id}
                        actionLabel="Cancel Guest Reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default ReservationsClient
